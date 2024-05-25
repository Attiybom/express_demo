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
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// create new user
router.post("/", (req, res) => {
  const { name } = req.body;

  // validate name
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // check if user already exists
  if (users.find((user) => user.name === name)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ id: users.length + 1, name });

  res.send({
    message: "User created successfully",
  });
});

module.exports = router;
