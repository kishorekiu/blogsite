import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const ProfileRedirect = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token", token);
  if (!token) {
    redirect("/auth/login");
  }
  let destination = "/auth/login";
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);
    if (decoded?.username) {
      destination = `/profile/${decoded?.username}`;
    }
  } catch (e) {
    console.error("error verifying token", e);
  } finally {
    redirect(destination || "/auth/login");
  }
};

export default ProfileRedirect;
