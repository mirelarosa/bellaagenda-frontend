import { http, HttpResponse } from 'msw';

const API = 'http://localhost:3000/api';

export const handlers = [
  http.get(`${API}/health`, () => {
    return HttpResponse.json({ data: { status: 'ok' } });
  }),
  http.get(`${API}/services`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 'svc-1',
          name: 'Corte',
          description: 'Corte básico',
          durationMinutes: 30,
          priceCents: 5000,
          active: true
        }
      ]
    });
  }),
  http.get(`${API}/auth/me`, ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth) {
      return HttpResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 });
    }
    if (auth.includes('admin')) {
      return HttpResponse.json({
        data: { id: '1', email: 'admin@test.com', name: 'Admin', role: 'admin' }
      });
    }
    if (auth.includes('pro')) {
      return HttpResponse.json({
        data: { id: '2', email: 'pro@test.com', name: 'Pro', role: 'professional' }
      });
    }
    return HttpResponse.json({
      data: { id: '3', email: 'client@test.com', name: 'Client', role: 'client' }
    });
  }),
  http.post(`${API}/auth/sync`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        data: {
          id: '3',
          email: 'user@test.com',
          name: body.name || 'User',
          role: body.role || 'client'
        }
      },
      { status: 201 }
    );
  }),
  http.get(`${API}/reports/summary`, () => {
    return HttpResponse.json({
      data: {
        revenue: { total_revenue_cents: 10000, paid_count: 2 },
        appointmentsByStatus: [{ status: 'confirmed', count: 3 }],
        reviews: { average_rating: 4.5, review_count: 1 }
      }
    });
  }),
  http.get(`${API}/appointments`, () => {
    return HttpResponse.json({ data: [] });
  }),
  http.get(`${API}/professionals`, () => {
    return HttpResponse.json({
      data: [{ id: 'pro-1', name: 'Ana', email: 'ana@test.com', active: true }]
    });
  })
];
