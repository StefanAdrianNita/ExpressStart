import { Request, Response } from "express";
import { getAllProducts } from "./services/allProducts";

const allProducts = async (req: any, res: any) => {
  console.log(" [Server]: called /v1/products/ (allProducts)");
  getAllProducts().then((data) => {
    console.log(data);
    res.json(data);
  });
};
module.exports = {
  allProducts,
};
