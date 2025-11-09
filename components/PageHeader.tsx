"use client";

import React from "react";

interface SectionHeaderProps {
  /** Main heading text */
  title: string;
  /** Short description or subtitle */
  description: string;
  /** Optional className for container customization */
  className?: string;
  /** Optional custom count component */
  countComponent?: React.ReactNode;
}

const PageHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
  countComponent = null,
}) => {
  return (
    <div
      className={` hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 ${className}`}
    >
      {/* Left: Title + Description */}
      <div className="">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
      {/* Right: Count Component (if provided) */}
      {countComponent && (
        <div className="self-start sm:self-auto">{countComponent}</div>
      )}
    </div>
  );
};

export default PageHeader;
