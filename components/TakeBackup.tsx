"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Download, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, startOfMonth, endOfMonth } from "date-fns";

type Mode = "month" | "range";

export default function PatientBackup() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("month");
  const [month, setMonth] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      let from: string | undefined;
      let to: string | undefined;

      if (mode === "month" && month) {
        const selected = new Date(month);
        from = startOfMonth(selected).toISOString();
        to = endOfMonth(selected).toISOString();
      } else if (mode === "range" && range?.from && range?.to) {
        from = range.from.toISOString();
        to = range.to.toISOString();
      } else {
        alert("Please select a valid month or date range.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api?from=${from}&to=${to}&limit=1000`);
      const result = await res.json();

      if (!result?.success || !result?.data?.length) {
        alert("No patient data found for the selected range.");
        setLoading(false);
        return;
      }

      const patients = result.data;

      const formatted = patients.map((p: any, i: number) => ({
        "Sr No": i + 1,
        "Patient Name": p.patient_name,
        "Age": p.age,
        "Gender": p.gender,
        "Disease / Problem": p.disease_problem,
        "Address": p.address,
        "Contact": p.contact,
        "Doctor ID": "Dr. Lovepreet Singh BDS (General Dentist)",
        "Created At": new Date(p.created_at).toLocaleString(),
      }));

      const ws = XLSX.utils.json_to_sheet(formatted);
      ws["!cols"] = [
        { wch: 6 },
        { wch: 20 },
        { wch: 8 },
        { wch: 10 },
        { wch: 25 },
        { wch: 30 },
        { wch: 15 },
        { wch: 20 },
        { wch: 22 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Patients");

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(
        blob,
        `patients_backup_${from?.split("T")[0]}_to_${to?.split("T")[0]}.xlsx`
      );

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error generating backup");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="relative w-full">
  {/* Trigger Button */}
  <Button
    onClick={() => setOpen(!open)}
    className="gap-2 w-full sm:w-auto "
  >
    <Download className="h-4 w-4" />
    <span className="sm:block hidden">Take Backup</span>
  </Button>

  {/* Inline Dialog Content */}
  {open && (
    <div
      className="
        absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-[400px]
        bg-white border rounded-xl shadow-xl p-5 z-50
        animate-in fade-in-0 zoom-in-95
      "
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Select Backup Range
      </h2>

      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={mode === 'month' ? 'default' : 'outline'}
          onClick={() => setMode('month')}
          className="flex-1 sm:flex-none"
        >
          By Month
        </Button>
        <Button
          variant={mode === 'range' ? 'default' : 'outline'}
          onClick={() => setMode('range')}
          className="flex-1 sm:flex-none"
        >
          Custom Range
        </Button>
      </div>

      {/* Month Picker */}
      {mode === 'month' && (
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">
            Select Month
          </label>
          <input
            type="month"
            className="border rounded-md px-3 py-2 w-full"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      )}

      {/* Date Range Picker */}
      {mode === 'range' && (
        <div className="relative mb-4">
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from && range?.to
              ? `${format(range.from, 'MMM d, yyyy')} - ${format(
                  range.to,
                  'MMM d, yyyy'
                )}`
              : 'Select date range'}
          </Button>

          {showCalendar && (
            <div
              className="
                absolute z-50 mt-2 rounded-xl border bg-white shadow-lg p-3
                w-[90vw] sm:w-auto max-w-full sm:max-w-none
              "
            >
              <Calendar
                mode="range"
                numberOfMonths={window.innerWidth < 640 ? 1 : 2}
                selected={range}
                onSelect={setRange}
              />
              <div className="flex justify-end mt-2">
                <Button
                  size="sm"
                  onClick={() => setShowCalendar(false)}
                  variant="secondary"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          onClick={handleExport}
          disabled={loading}
          className="gap-2 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Generate Backup
            </>
          )}
        </Button>
      </div>
    </div>
  )}
</div>

  );
}
