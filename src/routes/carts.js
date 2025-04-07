import express from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/authorization.js";
import CartRepository from "../repositories/CartRepository.js";
import Ticket from "../models/Ticket.js";
import Product from "../models/Product.js";
import crypto from "crypto";

const router = express.Router();

// Obtener el carrito del usuario
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const cart = await CartRepository.getByUserId(req.user._id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el carrito", error });
    }
  }
);

// Agregar un producto al carrito
router.post(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  async (req, res) => {
    try {
      const updatedCart = await CartRepository.addProduct(
        req.user._id,
        req.params.productId,
        req.body.quantity || 1
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar el producto", error });
    }
  }
);

// Eliminar un producto del carrito
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  async (req, res) => {
    try {
      const updatedCart = await CartRepository.removeProduct(
        req.user._id,
        req.params.productId
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el producto", error });
    }
  }
);

// Procesar compra
router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["user"]),
  async (req, res) => {
    try {
      const cart = await CartRepository.getByUserId(req.user._id);
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "El carrito está vacío" });
      }

      let totalAmount = 0;
      const purchasedProducts = [];
      const failedProducts = [];

      for (const item of cart.products) {
        const product = await Product.findById(item.product._id);
        if (product && product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
          totalAmount += product.price * item.quantity;
          purchasedProducts.push(item.product._id);
        } else {
          failedProducts.push(item.product._id);
        }
      }

      const ticket = await Ticket.create({
        code: crypto.randomUUID(),
        amount: totalAmount,
        purchaser: req.user.email,
      });

      await CartRepository.clearCart(req.user._id);

      // Reagregar productos fallidos al carrito
      for (const productId of failedProducts) {
        await CartRepository.addProduct(req.user._id, productId, 1);
      }

      res.json({ ticket, failedProducts });
    } catch (error) {
      res.status(500).json({ message: "Error al procesar la compra", error });
    }
  }
);

export default router;
