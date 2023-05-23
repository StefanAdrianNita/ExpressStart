# ExpressStart

![image](https://img.shields.io/badge/NodeJS-18.15.0-brightgreen/?style=for-the-badge&logo=node.js)

A boilerplate that aims for simplicity but at the same time efficency.

## Install

To start, you simply have to clone this repo and replace any part that references ExpressStart with your project.

```bash
git clone https://github.com/StefanAdrianNita/ExpressStart
```

Disclaimer: A npm script for installation is work in progress at the moment.

## Usage

ExpressStart is an already prepared express project running typescript, dotenv, nodemon and concurrency.

To start create .env file with a PORT variable.

```bash
# .env file on root

PORT=3001
```

If you don't set up this file the server will fallback on the default port which is 2999

## Documentation (The ExpressStart Architecture)

Everything you need is in the src folder.

```bash
src # This will contain the versioning of your api
|__ v1
    |__ app.ts # API entry point
    |__ products
    |__ users
    |__ ...
        # contains the declaration of the routes
        |__ routes.ts
        # contains the extractor of data from the request and calls the service
        |__ controller.ts
        |__ data.ts
        |__ services
            |__ allProducts.ts
        # For every endpoint you have a .ts file in services that does the business logic and calls the data layer using the data.ts file under the entity folder.
```

### Entry point

app.ts is the entry point of the server
here we start up express and we listen for api calls.

```javascript
// app.ts

// We initiate the necessary dependencies and configurations.

import express, { Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 2999;

// Here we import all the routes.ts file for every API entity we have.
const productsRoutes = require("./v1/products/routes");

/* After importing, we declare that the routes.ts file "productsRoutes" is the /products path.
Every call to /products/... will pass through here */
app.use("/products", productsRoutes);

// Here we listen for API calls.
app.listen(port, () => {
  console.log(` [Server]: Listening on port ${port}`);
});
```

### Routes

Time to take a look at the routes declaration inside the products/routes.ts file.

```javascript
// products/routes.ts

//We import Router from the Express package
const router = require("express").Router();

//Then we import the controller that we're gonna write later.
const controller = require("./controller");

// Here we declare all the endpoints that we have on the /products path.
router.get("/", controller.allProducts);
router.get("/:id", controller.getByIdProducts);
router.post("/:id", controller.createNewProducts);
router.delete("/:id", controller.deleteByIdProducts);

// Each one of this endpoints will call a different function of the controller passing the request without changing anything.

module.exports = router;
```

### Controller

Each API Entity folder has one controller that gets called by the router and gets passed the whole request.
This layer will take care of extracting the necessary data from the request that is needed by the service layer (where the logical part of the API happens)

This is the layer that was imported in the router when writing:

```javascript
const controller = require("./controller");
```

Let's take a look at the controller.

```javascript
// products/controller.ts

// We start by importing the interfaces for the Request and the Response from Express and some functions from the service layer
import { Request, Response } from "express";
import { getAllProducts } from "./services/allProducts";

/* Here we are declaring the controller functions. These are async functions that call and wait for the service layer to respond.
We take care of extracting data from the request and of sending back the data with the response. */
const allProducts = async (req: any, res: any) => {
  const productId = req.query.id;
  getAllProducts(productId)
    .then((data) => {
      console.log(data);
      res.json(data).sendStatus(200);
    })
    .catch((error) => {
      res.json(error).sendStatus(500);
    });
};
module.exports = {
  allProducts,
};
```

### Services

When we write:

```javascript
import { getAllProducts } from "./services/allProducts";
```

we are actually importing one of the files/functions in "products/services/..."

Here we do all the business logic and we call, if necessary, the data layer to get some important data that we need from our DB or another API.

```javascript
// services/allProducts.ts

export const getAllProducts = async () => {
  return await fetchAllProducts();
};
```

### Flow of the architecture

In the end, we explained that the flow of a API entity is as follows:

```bash
  Client
    |
    |   (https://xxxxxx:3000/products/)
    |
    V
  App.ts - Router (/products)
    |
    |
    V
Controller ("/" - GetAllProducts)
    |
    |
    V
 Services (GetAllProducts())
    |
    |
    V
Data Layer (data.ts)
    |
    |   fetches all products from DB
    |
    V
 Database
```
