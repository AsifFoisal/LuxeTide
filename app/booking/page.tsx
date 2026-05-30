'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { getShipThumbAssetPath } from '@/src/lib/ship-assets';
import Link from 'next/link';
import { ArrowLeft, Ship } from 'lucide-react';
import { DESTINATIONS, SHIPS } from '@/src/constants';
import { PremiumButton, PremiumInput, PremiumSelect } from '@/src/components/PremiumUI';
import { createBooking } from '@/src/lib/bookings';
import { getActiveSuiteAvailabilities } from '@/src/lib/suite-availability';
import { getShipDetails } from '@/src/ship-details';
import type { SuiteAvailability } from '@/src/types';

const PACKAGE_OPTIONS = [
  { value: '2-days-1-night', label: '2 Days 1 Night' },
  { value: '3-days-2-nights', label: '3 Days 2 Nights' },
  { value: '4-days-3-nights', label: '4 Days 3 Nights' },
];

const ROOM_LIMITS_BY_SUITE_SLUG: Record<string, number> = {
  'infinity-royal-suite': 2,
  'vip-panorama-triple-suite': 1,
  'panorama-deluxe-suite': 21,
  'panorama-triple-suite': 3,
  'panorama-king-suite': 2,
};

const ROOM_LIMITS_BY_SUITE_TITLE: Record<string, number> = {
  'Infinity Royal Suite': 2,
  'VIP Panorama Triple Suite': 1,
  'Panorama Deluxe Suite': 21,
  'Panorama Triple Suite': 3,
  'Panorama King Suite': 2,
};

function formatRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
}

function parseQueryValue(value: string | null): string {
  return value ?? '';
}

export default function BookingPage() {
  const defaultDestination = DESTINATIONS[0];
  const [queryData, setQueryData] = useState({
    shipId: '',
    shipName: '',
    suiteSlug: '',
    suiteTitle: '',
    destinationId: defaultDestination?.id ?? '',
    destinationName: defaultDestination?.name ?? '',
    dateRangeId: '',
  });
  const [selectedSuiteSlug, setSelectedSuiteSlug] = useState('');
  const [selectedSuiteTitle, setSelectedSuiteTitle] = useState('');
  const [selectedSuiteShipId, setSelectedSuiteShipId] = useState('');

  const [availableRanges, setAvailableRanges] = useState<SuiteAvailability[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    packageLabel: '2-days-1-night',
    rooms: '1',
    guests: '2',
    ourRoom: '',
    availableDate: '',
    specialRequests: '',
  });

  useEffect(() => {
    let isMounted = true;

    getActiveSuiteAvailabilities()
      .then((ranges) => {
        if (isMounted) {
          setAvailableRanges(ranges);
        }
      })
      .catch((error) => {
        console.error('Failed to load availability:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shipId = parseQueryValue(params.get('shipId'));
    const suiteSlug = parseQueryValue(params.get('suiteSlug'));
    const suiteTitle = parseQueryValue(params.get('suiteTitle'));
    const destinationId = parseQueryValue(params.get('destinationId')) || defaultDestination?.id || '';
    const destinationName = parseQueryValue(params.get('destinationName')) || defaultDestination?.name || '';

    setQueryData({
      shipId,
      shipName: parseQueryValue(params.get('shipName')),
      suiteSlug,
      suiteTitle,
      destinationId,
      destinationName,
      dateRangeId: parseQueryValue(params.get('dateRangeId')),
    });

    setSelectedSuiteSlug(suiteSlug);
    setSelectedSuiteTitle(suiteTitle);
    setSelectedSuiteShipId(shipId);
  }, []);

  const selectedRange = useMemo(() => {
    return availableRanges.find((range) => range.id === queryData.dateRangeId) || null;
  }, [availableRanges, queryData.dateRangeId]);

  const maxRooms = useMemo(() => {
    return (
      ROOM_LIMITS_BY_SUITE_SLUG[selectedSuiteSlug] ??
      ROOM_LIMITS_BY_SUITE_TITLE[selectedSuiteTitle] ??
      4
    );
  }, [selectedSuiteSlug, selectedSuiteTitle]);

  const roomOptions = useMemo(() => {
    const count = Math.max(1, maxRooms);
    return Array.from({ length: count }, (_, index) => index + 1);
  }, [maxRooms]);

  const selectedSuiteKey = useMemo(() => {
    if (!selectedSuiteShipId || !selectedSuiteSlug) {
      return '';
    }
    return `${selectedSuiteShipId}::${selectedSuiteSlug}`;
  }, [selectedSuiteShipId, selectedSuiteSlug]);

  const ship = useMemo(() => {
    return SHIPS.find((item) => item.id === queryData.shipId) || SHIPS[0];
  }, [queryData.shipId]);

  const suiteOptions = useMemo(() => {
    return SHIPS.flatMap((shipItem) => {
      const shipDetails = getShipDetails(shipItem.id);
      return (
        shipDetails?.suites.map((suite) => ({
          key: `${shipItem.id}::${suite.slug}`,
          shipId: shipItem.id,
          shipName: shipItem.name,
          slug: suite.slug,
          title: suite.title,
        })) ?? []
      );
    });
  }, []);

  useEffect(() => {
    if (selectedRange) {
      setFormData((current) => ({
        ...current,
        availableDate: formatRange(selectedRange.startDate, selectedRange.endDate),
      }));
    }
  }, [selectedRange]);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      ourRoom: selectedSuiteTitle || current.ourRoom,
    }));
  }, [selectedSuiteTitle]);

  useEffect(() => {
    if (!selectedSuiteSlug && selectedSuiteTitle && suiteOptions.length > 0) {
      const match = suiteOptions.find((suite) => suite.title === selectedSuiteTitle);
      if (match) {
        setSelectedSuiteSlug(match.slug);
        setSelectedSuiteShipId(match.shipId);
        setQueryData((current) => ({
          ...current,
          shipId: match.shipId,
          shipName: match.shipName,
          suiteSlug: match.slug,
          suiteTitle: match.title,
        }));
      }
    }
  }, [selectedSuiteSlug, selectedSuiteTitle, suiteOptions]);

  useEffect(() => {
    setFormData((current) => {
      const currentRooms = Number(current.rooms || '1');
      const normalizedRooms = Number.isFinite(currentRooms) && currentRooms > 0 ? currentRooms : 1;
      if (normalizedRooms > maxRooms) {
        return { ...current, rooms: String(maxRooms) };
      }
      if (normalizedRooms < 1) {
        return { ...current, rooms: '1' };
      }
      return current;
    });
  }, [maxRooms]);

  const shipImage = getShipThumbAssetPath(ship?.image || '/ships/the-wave-2/ship.jpg');

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!selectedRange) {
      setSubmitError('Please select a date range from the homepage before booking.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const packageOption = PACKAGE_OPTIONS.find((option) => option.value === formData.packageLabel) || PACKAGE_OPTIONS[0];
    const dateRangeLabel = formatRange(selectedRange.startDate, selectedRange.endDate);

    try {
      await createBooking({
        customerName: formData.fullName,
        customerEmail: '',
        customerPhone: formData.phoneNumber,
        travelStart: selectedRange?.startDate || '',
        travelEnd: selectedRange?.endDate || '',
        passengers: Number(formData.guests || '1'),
        shipId: ship?.id,
        shipName: ship?.name,
        packageId: packageOption.value,
        packageLabel: packageOption.label,
        destinationId: queryData.destinationId || undefined,
        destinationName: queryData.destinationName || undefined,
        suiteSlug: selectedSuiteSlug || queryData.suiteSlug || undefined,
        suiteTitle: selectedSuiteTitle || queryData.suiteTitle || undefined,
        roomCount: Number(formData.rooms || '1'),
        guestCount: Number(formData.guests || '1'),
        selectedDateRangeLabel: dateRangeLabel,
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentMethod: '',
        totalAmount: '',
        specialRequests: formData.specialRequests,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Booking submission failed:', error);
      setSubmitError('Unable to submit booking right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      <section className="luxury-container py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm uppercase tracking-[0.25em]">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </section>

      <section className="luxury-container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
          <div className="relative min-h-168 overflow-hidden border border-white/10 bg-slate-900">
            <Image
              src={shipImage}
              alt={ship?.name || 'Ship'}
              fill
              priority
              className="object-cover"
              unoptimized={shipImage.startsWith('http')}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
                <Ship size={14} className="text-gold" /> Ship Booking
              </div>
              <div className="space-y-3 max-w-xl">
                <p className="editorial-label text-gold">Selected Suite</p>
                <h1 className="text-4xl sm:text-5xl font-heading text-white leading-tight">
                  {selectedSuiteTitle || queryData.suiteTitle || 'Choose a suite'}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base">
                  {ship?.name || queryData.shipName || 'Ship'}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Destination: {queryData.destinationName || defaultDestination?.name || 'The Sundarbans'}</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <p className="editorial-label text-gold">Reservation Form</p>
              <h2 className="text-3xl font-heading text-white">Complete Your Booking</h2>
              <p className="text-sm text-slate-400">
                Fill in the details below and our team will contact you.
              </p>
            </div>

            {isSubmitted ? (
              <div className="space-y-4 rounded-none border border-emerald-500/20 bg-emerald-500/10 p-6">
                <p className="text-emerald-200 font-medium">Booking submitted successfully.</p>
                <p className="text-sm text-slate-300">
                  Your request has been saved for admin follow-up.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/" className="outline-button inline-flex items-center justify-center h-12 px-6">
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Full Name</label>
                    <PremiumInput
                      value={formData.fullName}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('fullName', event.target.value)}
                      className="h-12"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Number</label>
                    <PremiumInput
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('phoneNumber', event.target.value)}
                      className="h-12"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Package</label>
                    <PremiumSelect
                      value={formData.packageLabel}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange('packageLabel', event.target.value)}
                      className="h-12 w-full"
                    >
                      {PACKAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-900">
                          {option.label}
                        </option>
                      ))}
                    </PremiumSelect>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Rooms</label>
                    <PremiumSelect
                      value={formData.rooms}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange('rooms', event.target.value)}
                      className="h-12 w-full"
                    >
                      {roomOptions.map((count) => (
                        <option key={count} value={String(count)} className="bg-slate-900">
                          {count}
                        </option>
                      ))}
                    </PremiumSelect>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Guests</label>
                    <PremiumSelect
                      value={formData.guests}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange('guests', event.target.value)}
                      className="h-12 w-full"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                        <option key={count} value={String(count)} className="bg-slate-900">
                          {count}
                        </option>
                      ))}
                    </PremiumSelect>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Our Room</label>
                    <PremiumSelect
                      value={selectedSuiteKey}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        const nextKey = event.target.value;
                        const match = suiteOptions.find((suite) => suite.key === nextKey);
                        const nextSlug = match?.slug ?? '';
                        const nextTitle = match?.title ?? '';

                        setSelectedSuiteSlug(nextSlug);
                        setSelectedSuiteTitle(nextTitle);
                        setSelectedSuiteShipId(match?.shipId ?? '');

                        if (nextTitle) {
                          setFormData((current) => ({ ...current, ourRoom: nextTitle }));
                        }

                        if (match) {
                          setQueryData((current) => ({
                            ...current,
                            shipId: match.shipId,
                            shipName: match.shipName,
                            suiteSlug: match.slug,
                            suiteTitle: match.title,
                          }));
                        }
                      }}
                      className="h-12 w-full"
                      disabled={suiteOptions.length === 0}
                    >
                      <option value="" className="bg-slate-900">
                        {suiteOptions.length === 0 ? 'No rooms available' : 'Select room'}
                      </option>
                      {suiteOptions.map((suite) => (
                        <option key={suite.key} value={suite.key} className="bg-slate-900">
                          {suite.title} - {suite.shipName}
                        </option>
                      ))}
                    </PremiumSelect>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Available Date</label>
                      <PremiumInput value={formData.availableDate} readOnly className="h-12" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Special Requests</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(event) => handleChange('specialRequests', event.target.value)}
                    className="w-full min-h-28 bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold/50 transition-all placeholder:text-slate-600"
                    placeholder="Any special requests"
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-rose-300">{submitError}</p>
                )}
                <PremiumButton type="submit" className="h-14 w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </PremiumButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
