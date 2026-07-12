import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/userModel.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager"]).optional(),
});

const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "default_jwt_secret", {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  try {
    const validated = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
      $or: [{ email: validated.email }, { username: validated.username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await User.create({
      username: validated.username,
      email: validated.email,
      password: hashedPassword,
      role: validated.role || "manager",
    });

    const token = createToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const validated = loginSchema.parse(req.body);

    const user = await User.findOne({ email: validated.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: error.message });
  }
};
