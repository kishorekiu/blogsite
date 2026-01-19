import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // 1. check if user present in DB
    const user: IUser = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "User Not Registered" },
        { status: 401 },
      );
    }

    // 2. check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect Password!" },
        { status: 401 },
      );
    }

    // 3. generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      // @ts-ignore
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    // 4. set cookie
    const response = NextResponse.json({
      message: "User Login Success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true, // Client JS cannot read this (Security)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 Day
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error Login Route", e },
      { status: 500 },
    );
  }
};
