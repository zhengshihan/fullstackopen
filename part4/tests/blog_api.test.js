const path = require("path"); // 导入 path 模块
require("dotenv").config({ path: path.resolve(__dirname, "../.env.test") });
const { test, after, before, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert/strict");
const Blog = require("../models/blog");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const initialBlogs = [
  {
    title: "Understanding JavaScript Closures",
    author: "Jane Doe",
    url: "https://example.com/javascript-closures",
    likes: 120,
  },
  {
    title: "A Guide to CSS Flexbox",
    author: "John Smith",
    url: "https://example.com/css-flexbox",
    likes: 85,
  },
];

// ...

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

before(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// test.only("contain id property", async () => {
//   const response = await api.get("/api/blogs");

//   const blogs = response.body;

//   // Check that each blog post has an 'id' property and does not have an '_id' property
//   blogs.forEach((blog) => {
//     assert.ok(blog.id, 'Expected blog post to have an "id" property');
//   });
// });
// test.only("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });
test.only("a valid note can be added ", async () => {
  const newBlog = {
    title: "Mastering Asynchronous JavaScript",
    author: "Alice Johnson",
    url: "https://example.com/asynchronous-javascript",
    likes: 200,
  };

  await api

    .post("/api/blogs")
    // .set({
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaGFoYSIsImlkIjoiNjZjODZiMjc2Y2I1OTIxYjJjZDZhMzllIiwiaWF0IjoxNzI0NDI2OTg1fQ.OTQ_7OqmTF3bMwZQzCY3P6VQKV4JkG2XnD9Dc50aOI8",
    // })
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  // const response = await api.get("/api/blogs").set({
  //   Authorization:
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhaGFoYSIsImlkIjoiNjZjODZiMjc2Y2I1OTIxYjJjZDZhMzllIiwiaWF0IjoxNzI0NDI2OTg1fQ.OTQ_7OqmTF3bMwZQzCY3P6VQKV4JkG2XnD9Dc50aOI8",
  // });

  // assert.strictEqual(response.body.length, initialBlogs.length + 1);
});

test(" like default ", async () => {
  const newBlog = {
    title: "Mastering Asynchronous JavaScript",
    author: "Alice Johnson",
    url: "https://example.com/asynchronous-javascript",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  console.log(response.body);
  const contents = response.body;
  assert.strictEqual(contents[2].likes, 0);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
});
test(" like default ", async () => {
  const newBlog = {
    url: "https://example.com/asynchronous-javascript",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
});
test("a valid note can be added ", async () => {
  await api.delete("/api/blogs/66c7aa7f4b52e096de5773bf").expect(204);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length - 1);
});
test("a valid note can be added ", async () => {
  const newBlog = {
    title: "Mastering Asynchronous JavaScript",
    author: "Johnson",
    url: "https://example.com/asynchronous-javascript",
    likes: 8,
  };

  response = await api.put("/api/blogs/66c7aa7f4b52e096de5773c1").send(newBlog);

  assert.strictEqual(response.body.likes, 8);
});

test("note without content is not added", async () => {
  const newNote = {
    username: "Eron",
    name: "Eron",
    password: "12345",
  };

  await api.post("/api/users").send(newNote).expect(409);
});
after(async () => {
  await mongoose.connection.close();
});
