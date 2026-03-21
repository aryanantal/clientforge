import { createContactService } from "../services/contact.services.js";
import { sendContactEmail } from "../services/mail.services.js";

export const submitContact = async (req, res) => {
  try {
    const contactData = req.body;
    const newContact = await createContactService(contactData);
    
    // Send email notification to admin
    try {
      await sendContactEmail(contactData);
      console.log("Email notification sent successfully");
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Continue with response even if email fails to send
    }
    
    res.status(201).json({
      success: true,
      data: newContact,
      message: "Contact message saved successfully"
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save contact message"
    });
  }
};
