"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { verifyAndSetPin } from "@/app/actions/pin";

interface PinDialogProps {
  open: boolean;
}

export default function PinDialog({ open, }: PinDialogProps) {
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pinValues];
      newPin[index] = value;
      setPinValues(newPin);

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pinValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const pin = pinValues.join("");

    if (pin.length < 4) {
      setError("Please enter all 4 digits.");
      setLoading(false);
      return;
    }

    try {
      const res = await verifyAndSetPin(pin);
      if (res.success) {
      } else {
        setError("Invalid PIN. Try again.");
        setPinValues(["", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm">
      <DialogContent className="max-w-sm p-6">
        <DialogHeader>
          <DialogTitle className="text-center">Enter Daily Access PIN</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* PIN Inputs */}
          <div className="flex justify-center gap-3">
            {pinValues.map((val, i) => (
              <input
                key={i}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                ref={(el) => (inputsRef.current[i] = el)}
                className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
