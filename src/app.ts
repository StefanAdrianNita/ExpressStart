import express, { Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 2999;

const productsRoutes = require("./v1/products/routes");

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(
    process.env.PORT
      ? " [Server]: dotenv loaded correctly"
      : " [Server]: dotenv loader has encountered an error, using fallback settings"
  );
  console.log(` [Server]: Listening on port ${port}`);
});
