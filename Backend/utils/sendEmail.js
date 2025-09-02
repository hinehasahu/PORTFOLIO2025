import nodemailer from "nodemailer";

export const sendEmail = async ({ subject, text, html, to }) => {
  try {
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
      html,
    });

    console.log(`✅ Email sent: ${subject} → ${to || process.env.TO_EMAIL}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email could not be sent.");
  }
};



