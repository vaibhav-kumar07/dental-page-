export const dynamic = "force-dynamic";
import PatientCard from "@/components/patientCard";
import { IPatient } from "@/lib/model/patient";
import { getPatients } from "@/lib/patient";
import React from "react";

export default async function page() {
  const allpatients = await getPatients();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {allpatients.map((patient: IPatient, index) => {
        return <PatientCard key={index} patient={patient} />;
      })}
    </div>
  );
}
