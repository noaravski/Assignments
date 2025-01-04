import request from "supertest";
import appInit from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import userModel from "../models/user_model";
import testPostsData from "./test_posts.json";
import { Express } from "express";

let app: Express;

type User = {
  _id?: string;
  email: string;
  username: string;
  password: string;
  refreshToken?: string;
};

const testUser: User = {
  email: "noaravski@gmail.com",
  username: "noa",
  password: "Noaravski123",
};

type Post = {
  _id?: string;
  title: string;
  content: string;
  sender: string;
};

const testPosts: Post[] = testPostsData;

beforeAll(async () => {
  console.log("[*] Before post tests run");
  app = await appInit();
  try {
    await postsModel.deleteMany();
    await userModel.deleteMany();
  } catch (err) {
    console.log("[*] No posts or users to delete!", err);
  }
  await request(app).post("/user").send(testUser);
  const response = await request(app).post("/user/login").send(testUser);
  testUser.refreshToken = response.body.refreshToken;
  testUser._id = response.body._id;
  expect(response.statusCode).toBe(200);
});

afterAll(() => {
  console.log("[*] After all tests");
  mongoose.connection.close();
});

describe("Posts Test", () => {
  test("Post -> get all post when empty", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Post -> create new posts (test_post.json)", async () => {
    for (let post of testPosts) {
      const response = await request(app)
        .post("/")
        .set("authorization", "JWT " + testUser.refreshToken)
        .send(post);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
      post._id = response.body._id;
    }
  });

  test("Post -> get all post (test_post.json)", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testPosts.length);
  });

  test("Post -> get post by id", async () => {
    const response = await request(app).get("/post/" + testPosts[0]._id);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPosts[0]._id);
  });

  test("Post -> get post by sender", async () => {
    const response = await request(app).get("/post").query({ sender: testUser.username });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].sender).toBe(testUser.username);
  });

  test("Post -> Delete post", async () => {
    const response = await request(app)
      .delete("/post/" + testPosts[0]._id)
      .set("authorization", "JWT " + testUser.refreshToken);
    expect(response.statusCode).toBe(200);

    const responseGet = await request(app).get("/posts/" + testPosts[0]._id);
    expect(responseGet.statusCode).toBe(404);
  });

  test("Post -> Delete non existing post", async () => {
    const response = await request(app)
      .delete("/post/" + "AAAAAAAAAAAAAAAAAAAAAAAA") //A - is valid id but not existing one
      .set("authorization", "JWT " + testUser.refreshToken);
    expect(response.statusCode).toBe(404);

    const responseGet = await request(app).get("/posts/" + testPosts[0]._id);
    expect(responseGet.statusCode).toBe(404);
  });

  test("Post -> Delete post with invalid id", async () => {
    const response = await request(app)
      .delete("/post/" + "AAA")  //A - is invalid id
      .set("authorization", "JWT " + testUser.refreshToken);
    expect(response.statusCode).toBe(404);

    const responseGet = await request(app).get("/posts/" + testPosts[0]._id);
    expect(responseGet.statusCode).toBe(404);
  });

  test("Post -> Failed to create new post", async () => {
    const response = await request(app)
      .post("/")
      .set("authorization", "JWT " + testUser.refreshToken)
      .send({
        content: "Test Content 1",
      });
    expect(response.statusCode).toBe(400);
  });
});
