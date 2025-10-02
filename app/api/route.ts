import { NextRequest, NextResponse } from "next/server";
import { addPatient, PatientData } from "@/lib/patient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patient_name,
      age,
      gender,
      disease_problem,
      address,
      contact,
    } = body;

    if (
      !patient_name ||
      !age ||
      !gender ||
      !disease_problem ||
      !address ||
      !contact
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
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

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
