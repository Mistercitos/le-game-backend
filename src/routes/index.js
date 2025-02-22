import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./products.js";
import cartRoutes from "./carts.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/users", userRoutes);

export default router;
