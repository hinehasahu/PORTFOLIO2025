import { ContactModel } from "../models/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contactForm = async (req,res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    let newMessage = await ContactModel.create({ name, email, message });

    await sendEmail({
      subject: "New Contact Message",
      text: `Name ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    await sendEmail({
      subject: "Thank You for Contacting Me!",
      text: `Hi ${name},\n\nThank you for reaching out! I’ll get back to you as soon as possible.\n\n– Twinkle 😊`,
      to: email,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Message sent successfully!",
        newMessage,
      });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
    console.log(error)
  }
};