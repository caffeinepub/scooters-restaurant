import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { CheckCircle, Loader2, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TIME_SLOTS = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setIsSubmitting(true);
    setError("");
    try {
      const dateObj = new Date(`${date} ${time}`);
      const timestamp = BigInt(dateObj.getTime()) * BigInt(1_000_000);
      await actor.submitReservation(
        name,
        phone,
        timestamp,
        BigInt(Number.parseInt(guests)),
        requests,
      );
      setIsSuccess(true);
    } catch (_err) {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsSuccess(false);
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("");
      setRequests("");
      setError("");
    }
    onOpenChange(open);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="booking.modal"
        className="max-w-lg bg-card border-border text-foreground max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-3 mb-1">
            <UtensilsCrossed
              className="w-6 h-6 text-gold"
              style={{ color: "oklch(0.78 0.17 85)" }}
            />
            <DialogTitle className="text-2xl font-heading gold-gradient-text">
              Reserve Your Table
            </DialogTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Book your spot at Scooters — we'll confirm within 30 minutes.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div
            data-ocid="booking.success_state"
            className="flex flex-col items-center py-10 text-center gap-4"
          >
            <CheckCircle
              className="w-16 h-16"
              style={{ color: "oklch(0.78 0.17 85)" }}
            />
            <h3 className="text-2xl font-heading gold-gradient-text">
              Table Reserved!
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Thank you, {name}! We've received your reservation for {guests}{" "}
              guest{Number.parseInt(guests) > 1 ? "s" : ""} on {date} at {time}.
              We'll confirm via phone shortly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-4"
              style={{ background: "oklch(0.52 0.21 27)", color: "white" }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="booking-name"
                  className="text-sm text-muted-foreground"
                >
                  Full Name *
                </Label>
                <Input
                  id="booking-name"
                  data-ocid="booking.name_input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-secondary border-border focus:border-ring"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="booking-phone"
                  className="text-sm text-muted-foreground"
                >
                  Phone Number *
                </Label>
                <Input
                  id="booking-phone"
                  data-ocid="booking.phone_input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="booking-date"
                  className="text-sm text-muted-foreground"
                >
                  Date *
                </Label>
                <Input
                  id="booking-date"
                  data-ocid="booking.date_input"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm text-muted-foreground">Time *</Label>
                <Select value={time} onValueChange={setTime} required>
                  <SelectTrigger
                    data-ocid="booking.time_select"
                    className="bg-secondary border-border"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border max-h-52">
                    {TIME_SLOTS.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">
                Number of Guests *
              </Label>
              <Select value={guests} onValueChange={setGuests} required>
                <SelectTrigger
                  data-ocid="booking.guests_select"
                  className="bg-secondary border-border"
                >
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="booking-requests"
                className="text-sm text-muted-foreground"
              >
                Special Requests
              </Label>
              <Textarea
                id="booking-requests"
                data-ocid="booking.requests_textarea"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="Any dietary requirements, celebrations, or special arrangements..."
                rows={3}
                className="bg-secondary border-border resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button
              data-ocid="booking.submit_button"
              type="submit"
              disabled={
                isSubmitting || !name || !phone || !date || !time || !guests
              }
              className="w-full h-11 text-base font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.21 27), oklch(0.62 0.2 35))",
                color: "white",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reserving...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
