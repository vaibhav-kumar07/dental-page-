"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { errorToast, successToast } from "./use-toast";
import { createPatient } from "@/actions/patients";

export function PatientForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    diseaseProblem: "",
    address: "",
    contact: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const validateForm = () => {
    if (!formData.patientName || formData.patientName.trim().length < 3) {
      return "Full name must be at least 3 characters long.";
    }
    const ageNum = Number(formData.age);
    if (!ageNum || ageNum < 1 || ageNum > 120) {
      return "Please enter a valid age between 1 and 120.";
    }
    if (!formData.gender) {
      return "Please select a gender.";
    }
    if (!formData.diseaseProblem || formData.diseaseProblem.trim().length < 5) {
      return "Please describe the disease/problem (at least 5 characters).";
    }
    if (!formData.address || formData.address.trim().length < 5) {
      return "Address must be at least 5 characters long.";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contact)) {
      return "Please enter a valid 10-digit contact number.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Run validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await createPatient(
        formData.patientName,
        Number(formData.age),
        formData.gender,
        formData.diseaseProblem,
        formData.address,
        formData.contact
      );
      if (result.success) {
        successToast("Patient Added Successfully");
        setFormData({
          patientName: "",
          age: "",
          gender: "",
          diseaseProblem: "",
          address: "",
          contact: "",
        });
      }
    } catch (error: any) {
      errorToast(error);
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg w-full mx-auto p-4 md:p-6 bg-white shadow-md rounded-xl"
    >
      <h2 className="text-xl md:text-2xl font-bold text-center text-blue-600">
        Patient Information
      </h2>

      {/* Full Name */}
      <div className="grid gap-2">
        <Label htmlFor="patientName">Full Name *</Label>
        <Input
          id="patientName"
          type="text"
          placeholder="Enter your full name"
          className="w-full"
          value={formData.patientName}
          onChange={(e) =>
            setFormData({ ...formData, patientName: e.target.value })
          }
        />
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            className="w-full"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
          >
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Disease */}
      <div className="grid gap-2">
        <Label htmlFor="diseaseProblem">Disease / Problem *</Label>
        <Textarea
          id="diseaseProblem"
          placeholder="Please describe your symptoms"
          rows={4}
          className="w-full"
          value={formData.diseaseProblem}
          onChange={(e) =>
            setFormData({ ...formData, diseaseProblem: e.target.value })
          }
        />
      </div>

      {/* Address */}
      <div className="grid gap-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          type="text"
          placeholder="Enter your address"
          className="w-full"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      {/* Contact */}
      <div className="grid gap-2">
        <Label htmlFor="contact">Contact *</Label>
        <Input
          id="contact"
          type="tel"
          placeholder="Enter your contact number"
          className="w-full"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Information"}
      </Button>
    </form>
  );
}
