/**
 * User route tests.
 */

const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/User");
const app = require("../index");
const api = supertest(app);


const initialUsers = [
    {
        "username": "someperson",
        "name": "First Person",
        "password": "test1",
    },
    {
        "username": "someperson2",
        "name": "Second Person",
        "password": "test1",
    },
    {
        "username": "someperson3",
        "name": "Third Person",
        "password": "test1",
    },
]


beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = initialUsers.map(u => new User(u));
  const promiseArray = userObjects.map(usr => usr.save());
  await Promise.all(promiseArray);
});


test("returns all users", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);
});


test("user creation should fail", async () => {
    const response = await api.post("/api/users").send(initialUsers[0]);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Username must be unique.");
});

test("user creation should fail empty password", async () => {
    const response = await api.post("/api/users").send({"name": "asd", "username": "someuser", "password": ""});
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Username or password too short.");
});


test("user creation should fail empty username", async () => {
    const response = await api.post("/api/users").send({"name": "asd", "username": "", "password":"dsasdasdasd"});
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Username or password too short.");
});


test("user creation should fail with short password", async () => {
    const response = await api.post("/api/users").send({"name": "asd", "username": "asddasdljkndkfjg", "password":"asd"});
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Username or password too short.");
});


test("user creation should fail with short username", async () => {
    const response = await api.post("/api/users").send({"name": "asd", "username": "ds", "password":"salasana123456"});
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Username or password too short.");
});


test("user post request should fail with missing fields", async () => {
    const response = await api.post("/api/users").send({"name": "asd", "password":"dsasdasdasd"});
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request, missing fields.");
});


afterAll(() => {
  mongoose.connection.close();
});
