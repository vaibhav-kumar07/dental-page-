"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import { PageLimit } from "@/lib/common/enums"; // your enum
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalItems: number; //  total items (not total pages)
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, className = "" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(PageLimit.TEN);

  // ✅ Correctly calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  // 🔍 Debug tip (remove later)
  console.log({ totalItems, limit, totalPages, currentPage });

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const getVisiblePages = () => {
    if (totalPages <= 3) return [...Array(totalPages)].map((_, i) => i + 1);

    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Prev Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className=" cursor-pointer px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={` cursor-pointer px-3 py-1.5 rounded-lg transition ${
              currentPage === page
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className=" cursor-pointer px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
