import type { Schedule } from '@/src/types';
import { requestJson } from '@/src/lib/api-client';

type ScheduleQuery = {
  status?: Schedule['status'];
  available?: boolean;
};

function buildQueryString(options?: ScheduleQuery): string {
  if (!options) {
    return '';
  }

  const params = new URLSearchParams();

  if (options.status) {
    params.set('status', options.status);
  }

  if (options.available) {
    params.set('available', 'true');
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getSchedules(options?: ScheduleQuery): Promise<Schedule[]> {
  const query = buildQueryString(options);
  return requestJson<Schedule[]>(`/api/schedules${query}`);
}

export async function getScheduleById(id: string): Promise<Schedule> {
  return requestJson<Schedule>(`/api/schedules/${id}`);
}

export async function createSchedule(input: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>): Promise<Schedule> {
  return requestJson<Schedule>('/api/schedules', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateSchedule(id: string, updates: Partial<Schedule>): Promise<Schedule> {
  return requestJson<Schedule>(`/api/schedules/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteSchedule(id: string): Promise<void> {
  await requestJson<{ ok: true }>(`/api/schedules/${id}`, {
    method: 'DELETE',
  });
}

export async function getSchedulesByShipId(shipId: string): Promise<Schedule[]> {
  const schedules = await getSchedules();
  return schedules.filter((schedule) => schedule.shipId === shipId);
}

export async function getAvailableSchedules(): Promise<Schedule[]> {
  return getSchedules({ available: true });
}
