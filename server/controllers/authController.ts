import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res
        .status(500)
        .json({ message: "Server error: JWT_SECRET is not defined" });
      return;
    }

    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: "1h" });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
