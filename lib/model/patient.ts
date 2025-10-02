import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPatient extends Document {
  doctor_id: string;
  patient_name: string;
  age: number;
  gender: string;
  disease_problem: string;
  address: string;
  contact: string;
  created_at: Date;
}

const PatientSchema = new Schema<IPatient>({
  doctor_id: { type: String, required: true },
  patient_name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  disease_problem: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  created_at: { type: Date, default: () => new Date() },
});

// Avoid model overwrite issue in Next.js hot reload
export const Patient =
  models.Patient || model<IPatient>("Patient", PatientSchema);
