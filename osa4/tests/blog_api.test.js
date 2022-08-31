const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Blog = require("../models/blog");
const api = supertest(app);


const initialBlogs = [
  {
    "title": "Hello world",
    "author": "Test1",
    "url": "/1",
    "likes": 20
  },
  {
    "title": "Hello universe",
    "author": "Test2",
    "url": "/2",
    "likes": 10
  },
  {
    "title": "Hello eternity",
    "author": "Test3",
    "url": "/3",
    "likes": 500000
  }
]

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

test("returnet blog count correct", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("blog contains id field", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach(blogItem => {
    expect(blogItem.id).toBeDefined();
  });
});

test("blog storage increases count", async () => {
  const newBlog = {
    "title": "New blog",
    "author": "TestAdd",
    "url": "/sdasd",
    "likes": 0
  }

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");

  const contents = response.body.map(item => item.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("New blog");
});

test("blog storage set likes default", async () => {
  const newBlogUndefinedLikes = {
    "title": "New blog",
    "author": "TestAdd",
    "url": "/sdasd"
  }

  await api.post("/api/blogs").send(newBlogUndefinedLikes);

  const response = await api.get("/api/blogs");

  const likes = response.body.map(item => item.likes);

  likes.forEach(item => {
    expect(item).toBeGreaterThanOrEqual(0);
  });
});

test("blog storage expected title an url", async () => {
  const newBlogNoTitle = {
    "author": "TestAdd",
    "url": "/sdasd",
    "likes": 0
  }

  const newBlogNoUrl = {
    "title": "New blog",
    "author": "TestAdd",
    "likes": 0
  }

  const newBlogNoUrlOrTitle = {
    "author": "TestAdd",
    "likes": 0
  }

  let response = await api.post("/api/blogs").send(newBlogNoTitle);
  expect(response.statusCode).toBe(400);

  response = await api.post("/api/blogs").send(newBlogNoUrl);
  expect(response.statusCode).toBe(400);

  response = await api.post("/api/blogs").send(newBlogNoUrlOrTitle);
  expect(response.statusCode).toBe(400);
});


afterAll(() => {
  mongoose.connection.close()
});
