import { ContactModel } from "../models/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: "Message is too short." });
  }

  try {
    let newMessage = await ContactModel.create({
      name,
      email,
      subject,
      message,
    });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Portfolio Contact Message",
      text: `Name ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    await sendEmail({
      subject: "Thank You for Reaching out!",
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
      <h2 style="color: #4A90E2;">Hi ${name},</h2>
      <p>Thank you for contacting me. I truly appreciate you taking the time to get in touch.</p>
      <p>I have received your message and will review it shortly. You can expect a response from me as soon as possible.</p>
      <p style="margin-top: 20px;">Best regards,<br/>
      <strong>Twinkle Sahu😊</strong></p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #777;">
        This is an automated acknowledgement. I’ll personally respond soon.
      </p>
    </div>`,
      to: email,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
    console.log(error);
  }
};
