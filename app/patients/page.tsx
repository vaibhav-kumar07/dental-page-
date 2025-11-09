export const dynamic = "force-dynamic";
import Pagination from "@/components/pagination/Pagination";
import PatientCard from "@/components/patientCard";
import { PageLimit } from "@/lib/common/enums";
import { IPatient } from "@/lib/model/patient";
import { getPatients } from "@/lib/patient";
import PatientPageHeader from "@/components/PatientPageHeader";
import { DateRangeFilter } from "@/components/common/DateRangeFilter";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const { page, limit, from, to } = await searchParams;
  const { patients, total } = await getPatients({
    page: Number(page) ? Number(page) : 1,
    limit: limit ? Number(limit) : PageLimit.TEN,
    from: from ? from : undefined,
    to: to ? to : undefined,
  });

  return (
    <div className="space-y-2">
      <PatientPageHeader total={total} />
      <div className="sm:hidden sm:w-full py-2  flex  flex-col gap-2 px-2">
        <Pagination className="w-fit" totalItems={total} />{" "}
        <DateRangeFilter className="w-full" buttonClassName="w-full py-2" />{" "}
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-1">
        {patients.map((patient, index) => {
          return <PatientCard key={patient._id} patient={patient} />;
        })}
      </div>
      <div className="hidden sm:flex justify-center">
        {" "}
        <Pagination totalItems={total} />
      </div>
    </div>
  );
}
