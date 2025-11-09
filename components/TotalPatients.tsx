import { IPatient } from "@/lib/model/patient";

interface TotalPatientsProps {
  patients: IPatient[];
}

const TotalPatients: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div className="sm:w-full h-9 border sm:bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium self-start sm:self-auto">
      {`Total Patient${total !== 1 ? "s" : ""} ${total}`}
    </div>
  );
};

export default TotalPatients;