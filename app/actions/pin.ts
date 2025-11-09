"use server";

import { cookies } from "next/headers";

export async function verifyAndSetPin(pin: string) {
  const CORRECT_PIN = process.env.NEXT_PUBLIC_DAILY_ACCESS_PIN || "3777"; // secure

  if (pin === CORRECT_PIN) {
    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-11-09"
    cookies().set("daily_pin", today, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().setHours(23, 59, 59, 999)), // expires end of day
    });
    return { success: true };
  }

  return { success: false };
}
