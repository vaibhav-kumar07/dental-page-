import PatientCard from "@/components/patientCard";
import { IPatient } from "@/lib/model/patient";
import { getAllPatient } from "@/lib/patient";
import React from "react";

export default async function paget() {
  const allpatients = await getAllPatient();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {allpatients.map((patient: IPatient, index) => {
        return <PatientCard key={index} patient={patient} />;
      })}
    </div>
  );
}
