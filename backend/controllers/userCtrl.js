const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/** Create a token for a user
 *
 * @param {Object} user
 * @returns {String}
 */

const createToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET_PHRASE, {
        expiresIn: "24h",
    });
};

/** Stores the user's token in a cookie
 *
 * @param {Response} res
 * @param {String} token
 */

const setCookie = (res, token) => {
    res.setHeader(
        "Set-Cookie",
        `token=${token};HttpOnly;SameSite=Lax;Max-Age=${60 * 60 * 24};${
            process.env.NODE_ENV === "production" && "Secure;"
        }`
    );
};

/**
 * Authenticate a user.
 *
 * @async
 * @route POST /API/users/login
 * @access Public
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs requis.");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = createToken(user);
        setCookie(res, token);

        res.status(200).json({
            message: "Utilisateur connecté.",
            _id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } else {
        res.status(401);
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
    }
});

/**
 * Create user.
 *
 * @async
 * @route POST /API/users/
 * @access Public
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.createUser = asyncHandler(async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body; // add imgUrl later

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs requis.");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(400);
        throw new Error(
            "Ce nom d'utilisateur existe déjà, veuillez en choisir un autre."
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hash,
        firstName,
        lastName,
    });

    if (user) {
        const token = createToken(user);
        setCookie(res, token);

        res.status(201).json({
            message: "Utilisateur créé.",
            _id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } else {
        res.status(400);
        throw new Error("Impossible de créer l'utilisateur.");
    }
});

/**
 * Get all users.
 *
 * @async
 * @route GET /API/users/
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.getAllUsers = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Utilisateur créé." });
});

/**
 * Get user info.
 *
 * @async
 * @route GET /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.getOneUser = asyncHandler(async (req, res) => {});

/**
 * Update user.
 *
 * @async
 * @route PUT /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.updateUser = asyncHandler(async (req, res) => {});

/**
 * Delete user.
 *
 * @async
 * @route DELETE /API/users/:id
 * @access Private
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise}
 */

exports.deleteUser = asyncHandler(async (req, res) => {});