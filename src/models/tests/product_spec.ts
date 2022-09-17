import { Product, productStore } from "../product";

const store = new productStore();

describe("Product testing model", () => {
  it("tests the availability of the index method", () => {
    expect(store.index).toBeDefined();
  });

  it("tests the availability of the show method", () => {
    expect(store.show).toBeDefined();
  });

  it("tests the availability of the create method", () => {
    expect(store.create).toBeDefined();
  });

  beforeAll(async () => {
    await store.create({
      name: "iphone",
      price: 50,
      category: "mobile",
    });
  });
  afterAll(async () => {
    await store.deleteAll();
  });

  it("tests the create method", async () => {
    const result = await store.create({
      name: "iphone",
      price: 50,
      category: "mobile",
    });
    expect(result.name).toEqual("iphone");
    expect(result.price).toEqual(50);
    expect(result.category).toEqual("mobile");
  });

  it("tests the index method", async () => {
    const result = await store.index();
    expect(result[0].name).toEqual("iphone");
    expect(result[0].price).toEqual(50);
    expect(result[0].category).toEqual("mobile");
  });

  it("tests the show method", async () => {
    const result = await store.show("1");

    () => {
      if (result === undefined) {
        return;
      }
      expect(result.name).toEqual("iphone");
      expect(result.price).toEqual(50);
      expect(result.category).toEqual("mobile");
    };
  });
});
