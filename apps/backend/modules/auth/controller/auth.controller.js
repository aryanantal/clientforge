import User from "../../../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user exist with this email",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account is inactive",
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Return user data and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user (role is "user" by default)
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: "user",
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const adminId = req.user?.id; // From auth middleware

    // Only admin can create users
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can create users",
      });
    }

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: role || "user", // Admin decides role
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser.toJSON(),
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during user creation",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Only admin can view all users
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can view users",
      });
    }

    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching users",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, isActive, role } = req.body;

    // Check authorization
    const isAdmin = req.user?.role === "admin";
    const isSameUser = req.user?.id === userId;

    if (!isAdmin && !isSameUser) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this user",
      });
    }

    // Non-admin users can only edit their own data
    if (!isAdmin) {
      delete req.body.role;
      delete req.body.isActive;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser.toJSON(),
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only admin can delete users
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete users",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting user",
    });
  }
};
