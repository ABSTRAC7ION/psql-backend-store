import { User, UserStore } from "../user";

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
    expect(result).toEqual({
      firstname: "ibrahim",
      lastname: "shady",
      password: "password",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        firstname: "ibrahim",
        lastname: "shady",
        password: "password",
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      firstname: "ibrahim",
      lastname: "shady",
      password: "password",
    });
  });
});
