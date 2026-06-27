const jwt = require("jsonwebtoken");
const User = require("./auth.model");
const sendResponse = require("../../utills/response");
const { JWT_SECRET } = require("../../config/jwt");

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

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : parseCookies(req).accessToken;

        if (!token) {
            return sendResponse(res, 401, false, "Access token is missing");
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user || !user.status) {
            return sendResponse(res, 401, false, "User not found or inactive");
        }

        req.user = user;
        next();
    } catch (error) {
        return sendResponse(res, 401, false, "Invalid or expired access token");
    }
};

module.exports = {
    protect,
    parseCookies
};
