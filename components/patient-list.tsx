"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  patient_name: string
  age: number
  gender: string
  disease_problem: string
  submitted_at: string
}

interface PatientListProps {
  patients: Patient[]
  doctorId: string
}

export function PatientList({ patients, doctorId }: PatientListProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (patientId: string) => {
    if (!confirm("Are you sure you want to delete this patient record?")) return

    setIsDeleting(patientId)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("patients").delete().eq("id", patientId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting patient:", error)
      alert("Failed to delete patient record")
    } finally {
      setIsDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No patient submissions yet.</p>
        <p className="text-sm text-muted-foreground mt-2">Share your QR code to start receiving patient information.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.patient_name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>
                  <Badge variant="outline">{patient.gender}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(patient.submitted_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Patient Details</DialogTitle>
                          <DialogDescription>Complete information for {patient.patient_name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">{patient.patient_name}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Age</p>
                              <p className="text-sm text-muted-foreground">{patient.age}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Gender</p>
                              <p className="text-sm text-muted-foreground">{patient.gender}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Disease / Problem</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {patient.disease_problem}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Submitted At</p>
                            <p className="text-sm text-muted-foreground">{formatDate(patient.submitted_at)}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(patient.id)}
                      disabled={isDeleting === patient.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}