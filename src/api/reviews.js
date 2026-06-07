import { apiRequest } from './client';

export function createReview(data) {
  return apiRequest('/reviews', { method: 'POST', body: JSON.stringify(data) });
}
