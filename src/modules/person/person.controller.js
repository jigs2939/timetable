const Person = require("./person.model");
const sendResponse = require("../../utills/response");

const createPerson = async (req, res, next) => {
    try {
        const person = await Person.create(req.body);

        return sendResponse(
            res,
            201,
            true,
            "Person created successfully",
            person
        );
    } catch (error) {
        next(error);
    }
};

const getPersons = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const query = {
            name: {
                $regex: search,
                $options: "i"
            }
        };

        const persons = await Person.find(query)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Person.countDocuments(query);

        return sendResponse(
            res,
            200,
            true,
            "Person list fetched successfully",
            {
                total,
                page: Number(page),
                persons
            }
        );
    } catch (error) {
        next(error);
    }
};

const getPersonById = async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);

        if (!person) {
            return sendResponse(
                res,
                404,
                false,
                "Person not found"
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Person fetched successfully",
            person
        );
    } catch (error) {
        next(error);
    }
};

const updatePerson = async (req, res, next) => {
    try {
        const person = await Person.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!person) {
            return sendResponse(
                res,
                404,
                false,
                "Person not found"
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Person updated successfully",
            person
        );
    } catch (error) {
        next(error);
    }
};

const deletePerson = async (req, res, next) => {
    try {
        const person = await Person.findByIdAndDelete(
            req.params.id
        );

        if (!person) {
            return sendResponse(
                res,
                404,
                false,
                "Person not found"
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Person deleted successfully",
            {}
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPerson,
    getPersons,
    getPersonById,
    updatePerson,
    deletePerson
};