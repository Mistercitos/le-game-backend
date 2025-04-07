export const successResponse = (
  res,
  data,
  message = "Operación exitosa",
  status = 200
) => {
  return res.status(status).json({ success: true, message, data });
};

export const errorResponse = (
  res,
  error,
  message = "Error en el servidor",
  status = 500
) => {
  return res
    .status(status)
    .json({ success: false, message, error: error.message || error });
};
