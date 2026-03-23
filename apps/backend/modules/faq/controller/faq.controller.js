import FAQ from "../../../models/FAQ.js";

// GET all FAQs (public)
export const getAllFAQs = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    const faqs = await FAQ.find(query).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new FAQ (admin only)
export const createFAQ = async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category: category || "general",
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a FAQ (admin only)
export const updateFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer, category, order, isActive } = req.body;

    const faq = await FAQ.findById(faqId);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    if (question) faq.question = question;
    if (answer) faq.answer = answer;
    if (category) faq.category = category;
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;

    await faq.save();

    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a FAQ (admin only)
export const deleteFAQ = async (req, res) => {
  try {
    const { faqId } = req.params;

    const faq = await FAQ.findById(faqId);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await faq.deleteOne();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};