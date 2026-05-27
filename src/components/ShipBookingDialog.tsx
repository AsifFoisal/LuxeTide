"use client";

import Link from 'next/link';
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { PremiumButton, PremiumInput } from "@/src/components/PremiumUI";
import { SHIPS } from '@/src/constants';

interface BookingPrefill {
  suiteTitle?: string;
  dateRangeLabel?: string;
  destinationName?: string;
}

interface ShipBookingDialogProps {
  shipName: string;
  shipId?: string;
  triggerLabel?: string;
  triggerClassName?: string;
  prefill?: BookingPrefill;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export default function ShipBookingDialog({
  shipName,
  shipId,
  triggerLabel = "Book This Ship",
  triggerClassName = "",
  prefill,
  open,
  onOpenChange,
  hideTrigger = false,
}: ShipBookingDialogProps) {
  // determine shipId from provided prop or by matching shipName
  const resolvedShipId = shipId || SHIPS.find((s) => s.name === shipName)?.id || '';

  const params: Record<string, string> = {};
  if (resolvedShipId) params.shipId = resolvedShipId;
  if (shipName) params.shipName = shipName;
  if (prefill?.suiteTitle) params.suiteTitle = prefill.suiteTitle;
  if (prefill?.dateRangeLabel) params.dateRangeId = prefill.dateRangeLabel;
  if (prefill?.destinationName) params.destinationName = prefill.destinationName;

  const href = `/booking?${new URLSearchParams(params).toString()}`;

  if (hideTrigger) return null;

  return (
    <Link href={href} className={`gold-button inline-flex items-center justify-center gap-2 ${triggerClassName}`}>
      {triggerLabel}
    </Link>
  );
}
