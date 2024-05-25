const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

// find all users
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "asc";

  if (!isNaN(limit) && sort === "desc") {
    res.json(users.slice(0, limit).reverse());
  } else if (!isNaN(limit) && sort === "asc") {
    res.json(users.slice(0, limit));
  }
});

// find user by id
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {

    const error = new Error("User not found");
    error.status = 404;
    return next(error);

    // return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// create new user
router.post("/", (req, res, next) => {
  const { name } = req.body;

  // validate name
  if (!name) {

    const error = new Error("Name is required");
    error.status = 400;
    return next(error);
  }

  // check if user already exists
  if (users.find((user) => user.name === name)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ id: users.length + 1, name });

  res.status(201).json({
    message: "User created successfully",
  });
});

// update user by id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  user.name = name;

  res.status(201).json({
    message: "User updated successfully",
  });
});

// delete user by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(201).json({
    message: "User deleted successfully",
  });
});

module.exports = router;
