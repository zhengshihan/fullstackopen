const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 4 || username.length < 4) {
    return response.status(400).json({ error: "password too short" }); // 返回 400 错误
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate username error
      console.log("Error: Duplicate username");
      response.status(409).json({
        error: "Username already exists. Please choose a different username.",
      });
    } else {
      // Handle other errors
      console.log("Error saving user:", error);
      response
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }
});
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});
module.exports = usersRouter;
