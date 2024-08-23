const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const { title, url, author, likes } = request.body;
  newBlog = new Blog({ title, url, likes, author, user: decodedToken.id });
  if (!title || !url) {
    return response.status(400).json({ error: "title and url are required" }); // 返回 400 错误
  }

  const result = await newBlog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  response.status(201).json(result);
});
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  console.log(blogs[0]);
  response.json(blogs);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response.status(400).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = {
    title: req.body.title,
    url: req.body.url,
    author: req.body.author,
    likes: req.body.likes,
  };

  updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
