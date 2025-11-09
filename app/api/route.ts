import { NextRequest, NextResponse } from "next/server";
import { addPatient, getPatients, PatientData } from "@/lib/patient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    console.log("GET API route:", page, limit, from, to);

    const result = await getPatients({ page, limit, from, to });

    return NextResponse.json({
      success: true,
      data: result.patients,
      total: result.total,
      page,
      limit,
    });
  } catch (error: any) {
    console.error("Error in GET API route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

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


