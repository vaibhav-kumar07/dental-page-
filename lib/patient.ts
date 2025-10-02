import { connectDB } from "./mongodb";
import { Patient, IPatient } from "./model/patient";
import { ObjectId } from "mongodb";

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
  const newObjectId = new ObjectId("507f191e810c19729de860ea");
  const newData = { ...data, doctor_id: newObjectId };
  try {
    const newPatient = new Patient(newData);
    const savedPatient = await newPatient.save();
    return { success: true, data: savedPatient };
  } catch (error: any) {
    console.error("Error adding patient:", error);
    return { success: false, error: error.message || "Internal Server Error" };
  }
}

export async function getAllPatient() {
  await connectDB();
  return await Patient.find();
}
