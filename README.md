# PSQL STORE BACKEND

---

## Port numbers

- DATABASE: 3000
- SERVER: 5000

## Environment Variables

`POSTGRES_HOST=127.0.0.1\ POSTGRES_DB=store\ POSTGRES_DB_TEST=store_test\POSTGRES_USER=postgres\ POSTGRES_PASSWORD=Barhoma@65\ BCRYPT_PASSWORD=secret-sauce\ SALT_ROUNDS=10\ TOKEN_SECRET=abstractionwoo!\ ENV=dev\ PORT=3000`

## Package Installation Instructions

- npm i @types/dotenv
- npm i bcrypt
- npm i body-parser
- npm i dotenv
- npm i express
- npm i jsonwebtoken
- npm i nodemon
- npm i pg
- npm i typescript
- npm i -g db-migrate
- npm i -g db-migrate-pg
- npm i --save cors
- npm i --save-dev @types/bcrypt
- npm i --save-dev @types/express
- npm i --save-dev @types/jasmine
- npm i --save-dev @types/pg
- npm i --save-dev jasmine
- npm i --save-dev jasmine-spec-reporter
- npm i --save-dev jasmine-ts
- npm i --save-dev ts-node
- npm i --save-dev tsc-watch
- npm i supertest
- npm i --save-dev @types/supertest

## To Setup DB:

- psql -U postgres
- CREATE USER 'user_name' WITH PASSWORD 'password';
- CREATE DATABASE store;
- CREATE DATABASE store_test;
- \c store
- GRANT ALL PRIVILEGES ON DATABASE store to 'user_name';
- \c store_test
- GRANT ALL PRIVILEGES ON DATABASE store_test to 'user_name';

## Migrations Up

- CREATE TABLE order_products ( id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE, product_id bigint REFERENCES product(id), FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE );

- CREATE TABLE orders ( id SERIAL PRIMARY KEY, user_id bigint NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, status VARCHAR(15) );

- CREATE TABLE users ( id SERIAL PRIMARY KEY, firstname VARCHAR(64), lastname VARCHAR(64), password VARCHAR );

- CREATE TABLE product ( id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price integer NOT NULL, category VARCHAR(64) NOT NULL );

## MIGRATIONS DOWN:

- DROP TABLE order_products;
- DROP TABLE orders;
- DROP TABLE users;
- DROP TABLE product;

## Setting and Running the App

- start the app: npm start
- watch for db connection: npm run watch
- run tests: npm run test
- migrate db up: npm run db:up
- migrate db down: npm run db:down

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
