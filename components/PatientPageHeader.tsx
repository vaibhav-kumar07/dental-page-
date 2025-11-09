import React from 'react'
import PageHeader from './PageHeader';
import TotalPatients from './TotalPatients';
import { IPatient } from '@/lib/model/patient';
import MobilePageHeader from './MobilePAgeHeader';
import PatientBackup from './TakeBackup';
import { DateRangeFilter } from './common/DateRangeFilter';

export default function PatientPageHeader({ total }: { total: number }) {
  return (
    <div className="container mx-auto px-3">
      
      <PageHeader
        title="Patients"
        description="Manage and view patient records"
        countComponent={
        <div className="w-fit flex items-center gap-2">
          <DateRangeFilter className="w-full" buttonClassName="w-full py-2" />{" "} 
          <PatientBackup />
          <TotalPatients total={total} />
        </div>
        }    
      />  
      <MobilePageHeader
        title="Patients"
        description="Manage and view patient records"
        countComponent={
          <TotalPatients total={total} />
        }
      />  
    
    </div>  
  )
}
