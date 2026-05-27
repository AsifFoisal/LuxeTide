import type { SuiteAvailability, SuiteAvailabilityStatus } from '@/src/types';
import { requestJson } from '@/src/lib/api-client';

type SuiteAvailabilityQuery = {
  status?: SuiteAvailabilityStatus;
  shipId?: string;
};

function buildQueryString(options?: SuiteAvailabilityQuery): string {
  if (!options) {
    return '';
  }

  const params = new URLSearchParams();

  if (options.status) {
    params.set('status', options.status);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getSuiteAvailabilities(options?: SuiteAvailabilityQuery): Promise<SuiteAvailability[]> {
  const query = buildQueryString(options);
  const items = await requestJson<SuiteAvailability[]>(`/api/suite-availability${query}`);

  if (options?.shipId) {
    return items.filter((item) => item.shipId === options.shipId);
  }

  return items;
}

export async function getActiveSuiteAvailabilities(): Promise<SuiteAvailability[]> {
  return getSuiteAvailabilities({ status: 'active' });
}

export async function getSuiteAvailabilitiesByShip(shipId: string): Promise<SuiteAvailability[]> {
  return getSuiteAvailabilities({ shipId });
}

export async function createSuiteAvailability(
  input: Omit<SuiteAvailability, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SuiteAvailability> {
  return requestJson<SuiteAvailability>('/api/suite-availability', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateSuiteAvailability(
  id: string,
  updates: Partial<SuiteAvailability>
): Promise<SuiteAvailability> {
  return requestJson<SuiteAvailability>(`/api/suite-availability/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteSuiteAvailability(id: string): Promise<void> {
  await requestJson<{ ok: true }>(`/api/suite-availability/${id}`, {
    method: 'DELETE',
  });
}
