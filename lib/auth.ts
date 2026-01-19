import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export const getDataFromToken = async (key?: string) => {
  try {
    const token = (await cookies()).get("token")?.value || "";
    if (!token) return null;
    // @ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET);
    return key ? decoded[key] : decoded.userId;
  } catch (e) {
    return null;
  }
};
