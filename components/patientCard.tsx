import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Phone, MapPin, Calendar, HeartPulse } from "lucide-react";
import { IPatient } from "@/lib/model/patient";

interface PatientCardProps {
  patient: IPatient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl shadow-md hover:shadow-lg transition p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          {patient.patient_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Age:</span>
          <span>{patient.age}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Gender:</span>
          <span>{patient.gender}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <HeartPulse className="w-4 h-4 text-red-500" /> Problem:
          </span>
          <span>{patient.disease_problem}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-500" /> Address:
          </span>
          <span className="text-right">{patient.address}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium flex items-center gap-1">
            <Phone className="w-4 h-4 text-purple-500" /> Contact:
          </span>
          <span>{patient.contact}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Created At:
          </span>
          <span>{new Date(patient.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
