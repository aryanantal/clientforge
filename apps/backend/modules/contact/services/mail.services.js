import nodemailer from "nodemailer";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aryanantal18@gmail.com",
    pass: "yyry nsia wdgv cnkn",
  },
});

// Send email to admin when a new contact inquiry is received
export const sendContactEmail = async (contactData) => {
  const { name, email, company, message } = contactData;

  const mailOptions = {
    from: "aryanantal18@gmail.com",
    to: "aryanantal18@gmail.com",
    subject: `New Contact Inquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Inquiry</h2>
        <p style="color: #666;">You have received a new contact inquiry from your website.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">This email was automatically generated when someone submitted the contact form on your website.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};
