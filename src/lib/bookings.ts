import type { Booking, BookingStatus, PaymentStatus } from '@/src/types';
import { requestJson } from '@/src/lib/api-client';

type BookingQuery = {
  search?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  sortBy?: 'createdAt' | 'travelStart';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

function buildQueryString(options?: BookingQuery): string {
  if (!options) {
    return '';
  }

  const params = new URLSearchParams();

  if (options.search) {
    params.set('search', options.search);
  }

  if (options.status) {
    params.set('status', options.status);
  }

  if (options.paymentStatus) {
    params.set('paymentStatus', options.paymentStatus);
  }

  if (options.sortBy) {
    params.set('sortBy', options.sortBy);
  }

  if (options.sortOrder) {
    params.set('sortOrder', options.sortOrder);
  }

  if (typeof options.limit === 'number') {
    params.set('limit', String(options.limit));
  }

  if (typeof options.offset === 'number') {
    params.set('offset', String(options.offset));
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getBookings(options?: BookingQuery): Promise<Booking[]> {
  const query = buildQueryString(options);
  return requestJson<Booking[]>(`/api/bookings${query}`);
}

export async function createBooking(input: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  return requestJson<Booking>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
  return requestJson<Booking>(`/api/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteBooking(id: string): Promise<void> {
  await requestJson<{ ok: true }>(`/api/bookings/${id}`, {
    method: 'DELETE',
  });
}
