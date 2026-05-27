import type { AdminUser, Booking, Schedule, SuiteAvailability } from '@/src/types';
import type { SuitePricing } from '@/src/types';

export type DbBooking = {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  travel_start: string | null;
  travel_end: string | null;
  passengers: number | null;
  ship_id: string | null;
  ship_name: string | null;
  package_id: string | null;
  package_label: string | null;
  destination_id: string | null;
  destination_name: string | null;
  suite_slug: string | null;
  suite_title: string | null;
  room_count: number | null;
  guest_count: number | null;
  selected_date_range_label: string | null;
  status: string | null;
  payment_status: string | null;
  payment_method: string | null;
  total_amount: string | null;
  special_requests: string | null;
  admin_notes: string | null;
  created_at: string | null;
};

export type DbSchedule = {
  id: string;
  ship_id: string | null;
  ship_name: string | null;
  departure_date: string | null;
  return_date: string | null;
  destination: string | null;
  price_per_person: string | null;
  total_capacity: number | null;
  booked_seats: number | null;
  status: string | null;
  amenities: string[] | null;
  itinerary: string[] | null;
  created_at: string | null;
  updated_at: string | null;
};

export type DbSuiteAvailability = {
  id: string;
  ship_id: string | null;
  ship_name: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type DbSuitePricing = {
  id: string;
  ship_id: string | null;
  ship_name: string | null;
  suite_name: string | null;
  suite_slug: string | null;
  price_per_night: number | null;
  b2b_price_per_night: number | null;
  b2c_price_per_night: number | null;
  capacity: number | null;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type DbAdminUser = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  status: string | null;
  last_login: string | null;
  created_at: string | null;
};

export function mapBookingFromDb(row: DbBooking): Booking {
  const travelStart = row.travel_start ?? '';
  const travelEnd = row.travel_end ?? '';

  return {
    id: row.id,
    customerName: row.customer_name ?? '',
    customerEmail: row.customer_email ?? '',
    customerPhone: row.customer_phone ?? undefined,
    travelStart,
    travelEnd,
    passengers: row.passengers ?? 0,
    shipId: row.ship_id ?? undefined,
    shipName: row.ship_name ?? row.ship_id ?? undefined,
    packageId: row.package_id ?? undefined,
    packageLabel: row.package_label ?? row.package_id ?? undefined,
    destinationId: row.destination_id ?? undefined,
    destinationName: row.destination_name ?? row.destination_id ?? undefined,
    suiteSlug: row.suite_slug ?? undefined,
    suiteTitle: row.suite_title ?? undefined,
    roomCount: row.room_count ?? undefined,
    guestCount: row.guest_count ?? undefined,
    selectedDateRangeLabel:
      row.selected_date_range_label ??
      (travelStart && travelEnd ? `${travelStart} - ${travelEnd}` : undefined),
    status: (row.status ?? 'pending') as Booking['status'],
    paymentStatus: (row.payment_status ?? 'unpaid') as Booking['paymentStatus'],
    paymentMethod: row.payment_method ?? undefined,
    totalAmount: row.total_amount ?? undefined,
    specialRequests: row.special_requests ?? undefined,
    adminNotes: row.admin_notes ?? undefined,
    createdAt: row.created_at ?? new Date().toISOString().split('T')[0],
  };
}

export function mapBookingToDb(input: Partial<Booking>): Partial<DbBooking> {
  return {
    id: input.id,
    customer_name: input.customerName,
    customer_email: input.customerEmail ?? null,
    customer_phone: input.customerPhone ?? null,
    travel_start: input.travelStart,
    travel_end: input.travelEnd,
    passengers: input.passengers,
    ship_id: input.shipId ?? null,
    ship_name: input.shipName ?? null,
    package_id: input.packageId ?? null,
    package_label: input.packageLabel ?? null,
    destination_id: input.destinationId ?? null,
    destination_name: input.destinationName ?? null,
    suite_slug: input.suiteSlug ?? null,
    suite_title: input.suiteTitle ?? null,
    room_count: input.roomCount ?? null,
    guest_count: input.guestCount ?? null,
    selected_date_range_label: input.selectedDateRangeLabel ?? null,
    status: input.status,
    payment_status: input.paymentStatus,
    payment_method: input.paymentMethod ?? null,
    total_amount: input.totalAmount ?? null,
    special_requests: input.specialRequests ?? null,
    admin_notes: input.adminNotes ?? null,
    created_at: input.createdAt,
  };
}

export function mapScheduleFromDb(row: DbSchedule): Schedule {
  return {
    id: row.id,
    shipId: row.ship_id ?? '',
    shipName: row.ship_name ?? row.ship_id ?? '',
    departureDate: row.departure_date ?? '',
    returnDate: row.return_date ?? '',
    destination: row.destination ?? '',
    pricePerPerson: row.price_per_person ?? '',
    totalCapacity: row.total_capacity ?? 0,
    bookedSeats: row.booked_seats ?? 0,
    status: (row.status ?? 'scheduled') as Schedule['status'],
    amenities: row.amenities ?? [],
    itinerary: row.itinerary ?? [],
    createdAt: row.created_at ?? new Date().toISOString().split('T')[0],
    updatedAt: row.updated_at ?? new Date().toISOString().split('T')[0],
  };
}

export function mapScheduleToDb(input: Partial<Schedule>): Partial<DbSchedule> {
  return {
    id: input.id,
    ship_id: input.shipId,
    ship_name: input.shipName,
    departure_date: input.departureDate,
    return_date: input.returnDate,
    destination: input.destination,
    price_per_person: input.pricePerPerson,
    total_capacity: input.totalCapacity,
    booked_seats: input.bookedSeats,
    status: input.status,
    amenities: input.amenities ?? null,
    itinerary: input.itinerary ?? null,
    created_at: input.createdAt,
    updated_at: input.updatedAt,
  };
}

export function mapSuiteAvailabilityFromDb(row: DbSuiteAvailability): SuiteAvailability {
  return {
    id: row.id,
    shipId: row.ship_id ?? '',
    shipName: row.ship_name ?? row.ship_id ?? '',
    startDate: row.start_date ?? '',
    endDate: row.end_date ?? '',
    status: (row.status ?? 'active') as SuiteAvailability['status'],
    createdAt: row.created_at ?? new Date().toISOString().split('T')[0],
    updatedAt: row.updated_at ?? new Date().toISOString().split('T')[0],
  };
}

export function mapSuiteAvailabilityToDb(input: Partial<SuiteAvailability>): Partial<DbSuiteAvailability> {
  return {
    id: input.id,
    ship_id: input.shipId,
    ship_name: input.shipName,
    start_date: input.startDate,
    end_date: input.endDate,
    status: input.status,
    created_at: input.createdAt,
    updated_at: input.updatedAt,
  };
}

export function mapSuitePricingFromDb(row: DbSuitePricing): SuitePricing {
  return {
    id: row.id,
    shipId: row.ship_id ?? '',
    shipName: row.ship_name ?? row.ship_id ?? '',
    suiteName: row.suite_name ?? '',
    suiteSlug: row.suite_slug ?? undefined,
    pricePerNight: row.price_per_night ?? row.b2b_price_per_night ?? 0,
    b2bPricePerNight: row.b2b_price_per_night ?? undefined,
    b2cPricePerNight: row.b2c_price_per_night ?? undefined,
    capacity: row.capacity ?? 0,
    description: row.description ?? undefined,
    createdAt: row.created_at ?? new Date().toISOString().split('T')[0],
    updatedAt: row.updated_at ?? new Date().toISOString().split('T')[0],
  };
}

export function mapSuitePricingToDb(input: Partial<SuitePricing>): Partial<DbSuitePricing> {
  return {
    id: input.id,
    ship_id: input.shipId,
    ship_name: input.shipName,
    suite_name: input.suiteName,
    suite_slug: input.suiteSlug ?? null,
    price_per_night: input.pricePerNight ?? input.b2bPricePerNight ?? null,
    b2b_price_per_night: input.b2bPricePerNight ?? null,
    b2c_price_per_night: input.b2cPricePerNight ?? null,
    capacity: input.capacity,
    description: input.description ?? null,
    created_at: input.createdAt,
    updated_at: input.updatedAt,
  };
}

export function mapAdminUserFromDb(row: DbAdminUser): AdminUser {
  return {
    id: row.id,
    name: row.name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? undefined,
    role: (row.role ?? 'staff') as AdminUser['role'],
    status: (row.status ?? 'active') as AdminUser['status'],
    lastLogin: row.last_login ?? undefined,
    createdAt: row.created_at ?? new Date().toISOString().split('T')[0],
  };
}

export function mapAdminUserToDb(input: Partial<AdminUser>): Partial<DbAdminUser> {
  return {
    id: input.id ?? undefined,
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    role: input.role,
    status: input.status,
    last_login: input.lastLogin ?? null,
    created_at: input.createdAt,
  };
}
