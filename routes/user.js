const express = require("express");
const router = express.Router();

const userController = require("../controller/postController");

// find all users
router.get("/", userController.getAllUsers);

// find user by id
router.get("/:id", userController.getUserById);

// create new user
router.post("/", userController.createUser);

// update user by id
router.put("/:id", userController.updateUserById);

// delete user by id
router.delete("/:id", userController.deleteUserById);

module.exports = router;
