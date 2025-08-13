import nodemailer from "nodemailer";

export const sendEmail = async ({ subject, text, to }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: to || process.env.TO_EMAIL,
    subject,
    text,
  });
};
