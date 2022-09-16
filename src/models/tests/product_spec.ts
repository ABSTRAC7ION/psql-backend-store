import { productStore } from "../product";
require("dotenv").config();

const store = new productStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "iphone",
      price: 500,
      category: "mobiles",
    });
    expect(result.name).toEqual("iphone");
    expect(result.price).toEqual(500);
    expect(result.category).toEqual("mobiles");
  });

  it("show method should return the correct product", async () => {
    const result = await store.show("1");
    expect(result.name).toEqual("ipone");
    expect(result.price).toEqual(500);
    expect(result.category).toEqual("mobiles");
  });

  it("delete method should remove the product", async () => {
    store.delete("1");
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
