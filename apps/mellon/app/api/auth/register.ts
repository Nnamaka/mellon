import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  console.log("entered rout")
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User registered Successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
