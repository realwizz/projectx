import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser } from "@/lib/db";

const SECRET = "projectx-secret";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = findUser(email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);

  return NextResponse.json({ token });
}