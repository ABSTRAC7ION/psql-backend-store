import supertest from "supertest";
import { orderStore } from "../../models/order";
import { productStore } from "../../models/product";
import { UserStore } from "../../models/user";
import app from "../../server";
require("dotenv").config();

const request = supertest(app);

describe("It tests the endpoints in the api", () => {
  const product = new productStore();
  const user = new UserStore();
  const order = new orderStore();

  beforeAll(async () => {
    await product.create({
      name: "iphone",
      price: 50,
      category: "store",
    });
    await user.create({
      firstname: "ibrahim",
      lastname: "shady",
      password: "password",
    });
  });
  //test
  it("tests the api endpoint status", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("tests successful access to the api endpoint ", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status === 400).toBeFalsy();
  });
  //users
  it("tests the users show endpoint status", async (): Promise<void> => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(401); //because token required
  });
  it("tests the users index endpoint status", async (): Promise<void> => {
    const response = await request.get("/users");
    expect(response.status).toBe(401); //because token required
  });
  //orders
  it("tests the orders select order by id endpoint status", async (): Promise<void> => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(401); //because token required
  });
  //products
  it("tests the products index endpoint status", async (): Promise<void> => {
    await product.create({
      name: "iphone",
      price: 50,
      category: "store",
    });
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("tests the products show endpoint status", async (): Promise<void> => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await user.deleteAll();
    await product.deleteAll();
  });
});
