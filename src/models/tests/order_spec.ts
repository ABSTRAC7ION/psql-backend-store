import { Order, orderStore } from "../order";
import { Product, productStore } from "../product";
import { User, UserStore } from "../user";

const store = new orderStore();

describe("Order testing model", () => {
  const product = new productStore();
  const user = new UserStore();

  beforeAll(async () => {
    await user.create({
      firstname: "ibrahim",
      lastname: "shady",
      password: "password",
    });
    await product.create({
      name: "samsung",
      price: 50,
      category: "mobiles",
    });
  });
  afterAll(async () => {
    await user.deleteAll();
    await product.deleteAll();
  });

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
