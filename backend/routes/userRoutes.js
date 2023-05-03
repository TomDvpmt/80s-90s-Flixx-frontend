const express = require("express");
const router = express.Router();
const {
    login,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userCtrl");
const { auth } = require("../middleware/auth");

router.post("/login", login);
router.get("/profile", auth, getOneUser);
router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
