import express from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/authorization.js";
import ProductRepository from "../repositories/ProductRepository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductRepository.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  async (req, res) => {
    try {
      const newProduct = await ProductRepository.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el producto", error });
    }
  }
);

export default router;
