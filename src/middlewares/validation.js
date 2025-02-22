export const validateProduct = (req, res, next) => {
  const { title, description, price, stock, category, image } = req.body;
  if (!title || !description || !price || !stock || !category || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Todos los campos son obligatorios" });
  }
  next();
};
