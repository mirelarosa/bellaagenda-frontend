import { apiRequest } from './client';

export function createCheckout(appointmentId) {
  return apiRequest('/payments/checkout', {
    method: 'POST',
    body: JSON.stringify({ appointmentId })
  });
}

export function syncPayment(sessionId) {
  return apiRequest('/payments/sync', {
    method: 'POST',
    body: JSON.stringify({ sessionId })
  });
}
