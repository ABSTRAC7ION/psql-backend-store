import { User, UserStore } from "../user";
require("dotenv").config();

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a User", async () => {
    const result = await store.create({
      firstname: "ibrahim",
      lastname: "shady",
      password: "password",
    });
    expect(result.firstname).toEqual("ibrahim");
    expect(result.lastname).toEqual("shady");
    expect(result.password).not.toEqual("password");
  });

  it("show method should return the correct users", async () => {
    const result = await store.show("1");
    expect(result.firstname).toEqual("ibrahim");
    expect(result.lastname).toEqual("shady");
    expect(result.password).not.toEqual("password");
  });
});
