/**
 * File contains tests for blog route.
 */

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Blog = require("../models/blog");
const User = require("../models/User");
const api = supertest(app);


describe("blog api tests", () => {

  const testUser =     {
    "username": "testOnlyUser-a7be7f6a-967c-49f1-8862-895e2e05cc53",
    "name": "Testing user",
    "password": "salasana123456",
  }

  let authorization = "";

  const initialBlogs = [
    {
      "title": "Hello world",
      "author": "Test1",
      "url": "/1",
      "likes": 20,
    },
    {
      "title": "Hello universe",
      "author": "Test2",
      "url": "/2",
      "likes": 10,
    },
    {
      "title": "Hello eternity",
      "author": "Test3",
      "url": "/3",
      "likes": 500000,
    }
  ]

  beforeEach(async () => {
    // Set up user
    User.deleteMany({});
    await api.post("/api/users").send(testUser);
    const user = await api.post("/api/login").send({
      "username": testUser.username,
      "password": testUser.password
    });

    authorization =  "bearer " + user.body.token;

    // Setup blog posts
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map(bl => new Blog(bl));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
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

    await api.post("/api/blogs").send(newBlog).set({ Authorization: authorization });

    const response = await api.get("/api/blogs");

    const contents = response.body.map(item => item.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("New blog");
  });

  test("unauthorized blog add responds 401", async () => {
    const newBlog = {
      "title": "New blog",
      "author": "TestAdd",
      "url": "/sdasd",
      "likes": 0
    }

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.statusCode).toBe(401);
  });

  test("blog storage set likes default", async () => {
    const newBlogUndefinedLikes = {
      "title": "New blog",
      "author": "TestAdd",
      "url": "/sdasd"
    }

    await api.post("/api/blogs").send(newBlogUndefinedLikes).set({ Authorization: authorization });

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

    let response = await api.post("/api/blogs").send(newBlogNoTitle).set({ Authorization: authorization });
    expect(response.statusCode).toBe(400);

    response = await api.post("/api/blogs").send(newBlogNoUrl).set({ Authorization: authorization });
    expect(response.statusCode).toBe(400);

    response = await api.post("/api/blogs").send(newBlogNoUrlOrTitle).set({ Authorization: authorization });
    expect(response.statusCode).toBe(400);
  });


  test("delete blog correctly", async () => {

    const blogToDelete = {
      "title": "delete me daddy",
      "author": "TestAdd",
      "url": "/sdasd",
      "likes": 0
    }

    let addBlogResponse = await api.post("/api/blogs").send(blogToDelete).set({ Authorization: authorization });
    const removeId = addBlogResponse.body.id;

    const user = await User.findOne({username: testUser.username});
    user.blogs = user.blogs.concat(removeId);
    await user.save();

    const beforeDelteLength = await api.get("/api/blogs");
    expect(beforeDelteLength.body).toHaveLength(initialBlogs.length + 1);

    const response = await api.delete(`/api/blogs/${removeId}`).set({ Authorization: authorization });
    expect(response.statusCode).toBe(204);
    const responseAfterDelete = await api.get("/api/blogs");
    expect(responseAfterDelete.body).toHaveLength(initialBlogs.length);
    initialBlogs.forEach(element => {
      expect(element._id).not.toBe(removeId);
    });
  });


  test("delete with falty id", async () => {
    const response = await api.delete(`/api/blogs/1`).set({ Authorization: authorization });
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


  afterAll(async () => {
    const tstUser = await User.findOne({username: testUser.username});
    tstUser.remove();
    mongoose.connection.close();
  });
});
