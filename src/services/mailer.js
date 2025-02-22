import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRecoveryEmail = async (email, token) => {
  const mailOptions = {
    from: `"Le Game" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperación de Contraseña - Le Game",
    html: `
      <h1>Recuperación de Contraseña</h1>
      <p>Haz clic en el enlace de abajo para restablecer tu contraseña:</p>
      <a href="http://localhost:3000/api/auth/reset-password/${token}">Restablecer Contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Correo de recuperación enviado a:", email);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
};
