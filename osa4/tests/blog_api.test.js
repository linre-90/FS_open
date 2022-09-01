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
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(bl => new Blog(bl))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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


test("delete blog correctly", async () => {
  const responseAll = await api.get("/api/blogs");

  const initialLen = responseAll.body.length;
  const removeId = responseAll.body[1].id;

  const response = await api.delete(`/api/blogs/${removeId}`);

  const responseAfterDelete = await api.get("/api/blogs");

  expect(response.statusCode).toBe(204);
  expect(responseAfterDelete.body).toHaveLength(initialLen - 1);
  initialBlogs.forEach(element => {
    expect(element._id).not.toBe(removeId);
  });
});


test("delete with falty id", async () => {
  const response = await api.delete(`/api/blogs/1`);
  expect(response.statusCode).toBe(404);
});


test("update entry", async () => {
  const responseAll = await api.get("/api/blogs");

  const updateId = responseAll.body[1].id;
  
  const newValues = {
    "title": "Hello universe",
    "author": "Update text",
    "url": "/2",
    "likes": 666
  }

  const response = await api.put(`/api/blogs/${updateId}`).send(newValues);

  expect(response.statusCode).toBe(200);
  expect(response.body.author).toBe(newValues.author);
  expect(response.body.likes).toBe(newValues.likes);
});


afterAll(() => {
  mongoose.connection.close()
});
