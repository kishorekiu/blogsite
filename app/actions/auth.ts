"use server";
import { cookies } from "next/headers";

export const deleteSession = async () => {
  (await cookies()).delete("token");
};
