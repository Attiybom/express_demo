
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

/**
 * @description get all users
 * @param {*} req
 * @param {*} res
 */
const getAllUsers = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "asc";

  if (!isNaN(limit) && sort === "desc") {
    res.json(users.slice(0, limit).reverse());
  } else if (!isNaN(limit) && sort === "asc") {
    res.json(users.slice(0, limit));
  }
}


/**
 * @description get user by id
 * @param {*} req
 * @param {*} res
 */
const getUserById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {

    const error = new Error("User not found");
    error.status = 404;
    return next(error);

    // return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}




/**
 * @description create a new user
 * @param {*} req
 * @param {*} res
 */

const createUser = (req, res, next) => {
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
}


/**
 * @description update user by id
 * @param {*} req
 * @param {*} res
 */
const updateUserById =  (req, res) => {
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
}


/**
 * @description delete user by id
 * @param {*} req
 * @param {*} res
 */
const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(201).json({
    message: "User deleted successfully",
  });
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
