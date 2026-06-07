import { apiRequest } from './client';

export function listAppointments(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return apiRequest(`/appointments${qs ? `?${qs}` : ''}`);
}

export function getAppointment(id) {
  return apiRequest(`/appointments/${id}`);
}

export function getAvailability({ professionalId, serviceId, date }) {
  const qs = new URLSearchParams({ professionalId, serviceId, date }).toString();
  return apiRequest(`/appointments/availability?${qs}`);
}

export function createAppointment(data) {
  return apiRequest('/appointments', { method: 'POST', body: JSON.stringify(data) });
}

export function confirmAppointment(id) {
  return apiRequest(`/appointments/${id}/confirm`, { method: 'PATCH' });
}

export function cancelAppointment(id) {
  return apiRequest(`/appointments/${id}/cancel`, { method: 'PATCH' });
}
