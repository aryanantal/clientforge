import Stats from "../../../models/Stats.js";

// GET all stats (public)
export const getAllStats = async (req, res) => {
  try {
    const stats = await Stats.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new stat (admin only)
export const createStat = async (req, res) => {
  try {
    const { label, value, order } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        success: false,
        message: "Label and value are required",
      });
    }

    const stat = await Stats.create({
      label,
      value,
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a stat (admin only)
export const updateStat = async (req, res) => {
  try {
    const { statId } = req.params;
    const { label, value, order, isActive } = req.body;

    const stat = await Stats.findById(statId);

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: "Stat not found",
      });
    }

    if (label) stat.label = label;
    if (value) stat.value = value;
    if (order !== undefined) stat.order = order;
    if (isActive !== undefined) stat.isActive = isActive;

    await stat.save();

    res.status(200).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a stat (admin only)
export const deleteStat = async (req, res) => {
  try {
    const { statId } = req.params;

    const stat = await Stats.findById(statId);

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: "Stat not found",
      });
    }

    await stat.deleteOne();

    res.status(200).json({
      success: true,
      message: "Stat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};