import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const { username, email, password } = await request.json();

    // 1. check id user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required feilds" },
        { status: 401 }
      );
    }

    // 3. create user
    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
