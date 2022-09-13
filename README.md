# PSQL STORE BACKEND

---

## Setting and Running the App

- start the app: npm start
- watch for db connection: npm run watch
- run tests: npm run test

## END-POINTS

### Users

- shows all users on db: app.get("/users", index) [token required];
- shows certain user with id: app.get("/users/:id", show) [token required];
- creates user: app.post("/users", create);
- authenticate a user (responds with token that belongs to the user of it exists on db): app.post("/users/authenticate", authenticate);

### Products

- show all products: app.get("/products", index);
- show product with id: app.get("/products/:id", show);
- create a new product: app.post("/products", create) [token required];
- delete a product with id: app.delete("/products/:id", destroy);

### Orders

- to create an order:
  1. create an order(cart): app.post("/orders", create) [token required];
  2. add product to your order(_id from step above_): app.post("/orders/:id/products", addProduct);
- show all orders in the order(cart) you created above(_id from first step_): app.get("/orders/:id", show) [token required];
