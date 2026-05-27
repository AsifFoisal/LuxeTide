import type { SuitePricing } from '@/src/types';
import { requestJson } from '@/src/lib/api-client';

type SuitePricingQuery = {
  shipId?: string;
  shipName?: string;
};

function buildQueryString(options?: SuitePricingQuery): string {
  if (!options) {
    return '';
  }

  const params = new URLSearchParams();

  if (options.shipId) {
    params.set('shipId', options.shipId);
  }

  if (options.shipName) {
    params.set('shipName', options.shipName);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getSuitePricing(options?: SuitePricingQuery): Promise<SuitePricing[]> {
  const query = buildQueryString(options);
  return requestJson<SuitePricing[]>(`/api/suite-pricing${query}`);
}

export async function createSuitePricing(
  input: Omit<SuitePricing, 'id' | 'createdAt' | 'updatedAt'>
): Promise<SuitePricing> {
  return requestJson<SuitePricing>('/api/suite-pricing', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateSuitePricing(
  id: string,
  updates: Partial<SuitePricing>
): Promise<SuitePricing> {
  return requestJson<SuitePricing>(`/api/suite-pricing/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteSuitePricing(id: string): Promise<void> {
  await requestJson<{ ok: true }>(`/api/suite-pricing/${id}`, {
    method: 'DELETE',
  });
}
