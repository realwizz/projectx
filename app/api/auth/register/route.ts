import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addUser, findUser } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 Basic validation (important for marks)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    const existingUser = findUser(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // 🔐 Hash password (security requirement)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Save user
    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
    };

    addUser(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}