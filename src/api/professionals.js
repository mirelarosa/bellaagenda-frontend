import { apiRequest } from './client';

export function listProfessionals() {
  return apiRequest('/professionals');
}

export function createProfessional(data) {
  return apiRequest('/professionals', { method: 'POST', body: JSON.stringify(data) });
}

export function updateSchedule(id, slots) {
  return apiRequest(`/professionals/${id}/schedule`, {
    method: 'PUT',
    body: JSON.stringify({ slots })
  });
}
