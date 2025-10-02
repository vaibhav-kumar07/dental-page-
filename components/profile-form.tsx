"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Doctor {
  id: string
  doctor_name: string
  designation: string
  clinic_name: string
  contact_phone: string | null
  contact_email: string | null
}

interface ProfileFormProps {
  doctor: Doctor
}

export function ProfileForm({ doctor }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    doctorName: doctor.doctor_name,
    designation: doctor.designation,
    clinicName: doctor.clinic_name,
    contactPhone: doctor.contact_phone || "",
    contactEmail: doctor.contact_email || "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from("doctors")
        .update({
          doctor_name: formData.doctorName,
          designation: formData.designation,
          clinic_name: formData.clinicName,
          contact_phone: formData.contactPhone || null,
          contact_email: formData.contactEmail || null,
        })
        .eq("id", doctor.id)

      if (error) throw error

      setSuccess(true)
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="doctorName">Doctor Name *</Label>
          <Input
            id="doctorName"
            type="text"
            placeholder="Dr. John Doe"
            required
            value={formData.doctorName}
            onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="designation">Designation/Degree *</Label>
          <Input
            id="designation"
            type="text"
            placeholder="BDS, MDS"
            required
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clinicName">Clinic Name *</Label>
        <Input
          id="clinicName"
          type="text"
          placeholder="Guru Dental Clinic"
          required
          value={formData.clinicName}
          onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="clinic@example.com"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">Profile updated successfully!</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}