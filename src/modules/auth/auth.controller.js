const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");
const sendResponse = require("../../utills/response");
const { JWT_SECRET, REFRESH_SECRET } = require("../../config/jwt");

const cookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production"
};

const parseCookies = (req) => {
    const cookies = {};
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
        return cookies;
    }

    cookieHeader.split(";").forEach((cookie) => {
        const [name, ...rest] = cookie.trim().split("=");
        if (!name) return;
        cookies[name] = decodeURIComponent(rest.join("="));
    });

    return cookies;
};

const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
};

const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
});

const signTokens = (user) => ({
    accessToken: jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "15m" }),
    refreshToken: jwt.sign({ id: user._id, role: user.role, type: "refresh" }, REFRESH_SECRET, { expiresIn: "7d" })
});

const register = async (req, res, next) => {
    try {
        const { name, email, password, mobile, role = "user" } = req.body;

        if (!name || !email || !password) {
            return sendResponse(res, 400, false, "Name, email and password are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendResponse(res, 409, false, "Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashedPassword, mobile, role });

        return sendResponse(res, 201, true, "User registered successfully", sanitizeUser(user));
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, false, "Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !user.status) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return sendResponse(res, 401, false, "Invalid email or password");
        }

        const { accessToken, refreshToken } = signTokens(user);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

        user.refreshTokenHash = refreshTokenHash;
        await user.save();

        setAuthCookies(res, accessToken, refreshToken);

        return sendResponse(res, 200, true, "Login successful", {
            accessToken,
            refreshToken,
            user: sanitizeUser(user)
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const cookies = parseCookies(req);
        const refreshToken = cookies.refreshToken || req.body?.refreshToken;

        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
                const user = await User.findById(decoded.id);

                if (user) {
                    user.refreshTokenHash = null;
                    await user.save();
                }
            } catch (error) {
                // ignore invalid token on logout
            }
        }

        clearAuthCookies(res);
        return sendResponse(res, 200, true, "Logout successful");
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const cookies = parseCookies(req);
        const incomingRefreshToken = cookies.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            return sendResponse(res, 401, false, "Refresh token is missing");
        }

        let decoded;
        try {
            decoded = jwt.verify(incomingRefreshToken, REFRESH_SECRET);
        } catch (error) {
            return sendResponse(res, 401, false, "Invalid or expired refresh token");
        }

        const user = await User.findById(decoded.id);
        if (!user || !user.refreshTokenHash) {
            return sendResponse(res, 401, false, "Refresh token is invalid");
        }

        const isRefreshTokenValid = await bcrypt.compare(incomingRefreshToken, user.refreshTokenHash);
        if (!isRefreshTokenValid) {
            return sendResponse(res, 401, false, "Refresh token is invalid");
        }

        const { accessToken, refreshToken } = signTokens(user);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

        user.refreshTokenHash = refreshTokenHash;
        await user.save();

        setAuthCookies(res, accessToken, refreshToken);

        return sendResponse(res, 200, true, "Tokens refreshed successfully", { accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        return sendResponse(res, 200, true, "User profile fetched successfully", sanitizeUser(req.user));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    getProfile
};
