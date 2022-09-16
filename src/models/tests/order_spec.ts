import { orderStore } from "../order";
require("dotenv").config();

const store = new orderStore();

describe("Order testing", () => {
  it("tests the availability of the get order by id method", () => {
    expect(store.show).toBeDefined();
  });

  it("tests the create order method", () => {
    expect(store.create).toBeDefined();
  });

  it("tests the add product to an order method", () => {
    expect(store.addProduct).toBeDefined();
  });
});
