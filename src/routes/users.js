import express from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/authorization.js";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const router = express.Router();

// Obtener todos los usuarios (solo admin)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find({}, "-password");
      return successResponse(res, users, "Lista de usuarios obtenida");
    } catch (error) {
      return errorResponse(res, error, "Error al obtener los usuarios");
    }
  }
);

// Cambiar el rol de un usuario (solo admin)
router.put(
  "/:id/role",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin"]),
  async (req, res) => {
    try {
      const { role } = req.body;
      const validRoles = ["user", "admin"];

      if (!validRoles.includes(role)) {
        return res
          .status(400)
          .json({ success: false, message: "Rol inválido" });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }

      return successResponse(res, user, "Rol actualizado correctamente");
    } catch (error) {
      return errorResponse(
        res,
        error,
        "Error al actualizar el rol del usuario"
      );
    }
  }
);

export default router;
