import { createContactService } from "../services/contact.services.js";
import { sendContactEmail } from "../services/mail.services.js";
import { Contact } from "../shcema/contact.schemas.js";

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

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: contacts,
      message: "Contacts retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contacts"
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact"
    });
  }
};
