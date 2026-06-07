import { apiRequest } from './client';

export function syncUser(payload) {
  return apiRequest('/auth/sync', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function fetchMe() {
  return apiRequest('/auth/me');
}
