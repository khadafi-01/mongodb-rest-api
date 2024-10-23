import express from "express";

import { getProducts, createProducts, updateProducts, searchProducts, deleteProducts, deleteAllProducts } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.get("/search", searchProducts)
router.delete("/:id", deleteProducts);
router.delete("/", deleteAllProducts)

export default router;