import { apiRequest } from './client';

export function listServices() {
  return apiRequest('/services');
}

export function createService(data) {
  return apiRequest('/services', { method: 'POST', body: JSON.stringify(data) });
}

export function updateService(id, data) {
  return apiRequest(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteService(id) {
  return apiRequest(`/services/${id}`, { method: 'DELETE' });
}
