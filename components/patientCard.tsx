import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Phone, MapPin, Calendar, HeartPulse } from "lucide-react";
import { IPatient } from "@/lib/model/patient";

interface PatientCardProps {
  patient: IPatient;
}

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-2 py-3 px-2 rounded-2xl bg-gray-50">
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800 break-words">
        {value || "N/A"}
      </p>
    </div>
  </div>
);
const ProblemItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50">
    {/* Icon */}
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 flex-shrink-0">
      {icon}
    </div>

    {/* Content */}
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto rounded-3xl shadow-xl overflow-hidden p-0 gap-0">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-yellow-300">
        <CardTitle className="text-xl font-bold flex items-center gap-2 px-2">
          <User className="w-6 h-6" />
          <span>{patient.patient_name ?? "Unknown Patient"}</span>
        </CardTitle>
      </CardHeader>

      {/* Body */}
      <CardContent className=" px-3 py-4 space-y-3 ">
        {/* Problem - Full width */}
        <div className="w-full space-y-3">
          <ProblemItem
            icon={<HeartPulse className="w-4 h-4 text-red-500" />}
            label="Problem"
            value={patient.disease_problem ?? "N/A"}
          />

          <InfoItem
            icon={<MapPin className="w-4 h-4 text-green-500" />}
            label="Address"
            value={patient.address ?? "N/A"}
          />
        </div>

        {/* Stacked fields */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          <InfoItem
            icon={
              <span className="  font-bold flex items-center justify-center ">
                🎂
              </span>
            }
            label="Age"
            value={patient.age ?? "N/A"}
          />
          <InfoItem
            icon={
              <span className="  font-bold flex items-center justify-center ">
                ⚧
              </span>
            }
            label="Gender"
            value={patient.gender ?? "N/A"}
          />
          <InfoItem
            icon={<Phone className="w-4 h-4 text-purple-500" />}
            label="Contact"
            value={patient.contact ?? "N/A"}
          />
          <InfoItem
            icon={<Calendar className="w-4 h-4 text-gray-500" />}
            label="Added On"
            value={
              patient.created_at
                ? new Date(patient.created_at).toLocaleDateString()
                : "N/A"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
