import { apiRequest } from './client';

export function getSummary() {
  return apiRequest('/reports/summary');
}
