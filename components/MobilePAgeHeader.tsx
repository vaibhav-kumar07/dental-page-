import { IPatient } from "@/lib/model/patient";
import React, { FC } from "react";


interface MobilePageHeaderProps {
  /** Main heading text */
  title: string;
  /** Short description or subtitle */
  description: string;
  /** Optional className for container customization */
  className?: string;
countComponent?: React.ReactNode;
}

const MobilePageHeader: FC<MobilePageHeaderProps> = ({
  title,
  description,
  className = "",
  countComponent = null,
}) => {
  return (
    <div
      className={`sm:hidden  flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${className}`}
    >
      {/* Left: Title + Description */}
      <div className="">
       <div className="flex items-center justify-between gap-1"> 
         <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}
             </h2>
             {countComponent}
       </div>

        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default MobilePageHeader;
