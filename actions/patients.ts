"use server";

import { addPatient, PatientData } from "@/lib/patient";
import { revalidatePath } from "next/cache";

export async function createPatient(
  patient_name: string,
  age: number,
  gender: string,
  disease_problem: string,
  address: string,
  contact: string
) {
  try {
    // Validation
    if (
      !patient_name ||
      !age ||
      !gender ||
      !disease_problem ||
      !address ||
      !contact
    ) {
      return { success: false, error: "All fields are required" };
    }

    const patientData: PatientData = {
      patient_name,
      age: Number(age),
      gender,
      disease_problem,
      address,
      contact,
    };

    const result = await addPatient(patientData);

    // ✅ sanitize mongoose doc → plain object
    const safeData = result.data
      ? JSON.parse(JSON.stringify(result.data))
      : null;

    revalidatePath("/patients");

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return { success: true, data: safeData };
  } catch (error: any) {
    console.error("❌ Error in Server Action:", error);
    return { success: false, error: error.message || "Internal Server Error" };
  }
}
