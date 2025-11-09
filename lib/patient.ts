import { connectDB } from "./mongodb";
import { Patient, IPatient } from "./model/patient";
import { ObjectId } from "mongodb";

import { revalidatePath } from "next/cache";
export interface PatientData {
  doctor_id?: string;
  patient_name: string;
  age: number;
  gender: string;
  disease_problem: string;
  address: string;
  contact: string;
}

export async function addPatient(data: PatientData) {
  await connectDB();
  const newObjectId = new ObjectId("507f191e810c19729de860ea");
  const newData = { ...data, doctor_id: newObjectId };
  try {
    const newPatient = new Patient(newData);
    const savedPatient = await newPatient.save();
    Patient.find();
    return { success: true, data: savedPatient };
  } catch (error: any) {
    console.error("Error adding patient:", error);
    return { success: false, error: error.message || "Internal Server Error" };
  }
}

export const getPatients = async ({
  page = 1,
  limit = 10,
  from,
  to,
}: {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}) => {
  await connectDB();

  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(to) : undefined;

  const query: any = {};

  if (fromDate || toDate) {
    query.created_at = {}; // ✅ correct field name
    if (fromDate) query.created_at.$gte = fromDate;
    if (toDate) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.created_at.$lte = endOfDay;
    }
  }

  const allPatients = await Patient.find(query)
    .sort({ _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Patient.countDocuments(query);

  return {
    patients: allPatients,
    total,
  };
};
