import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '../src/auth/AuthContext';
import { DashboardPage } from '../src/pages/admin/DashboardPage';

vi.mock('../src/config/firebase', () => ({
  isMock: true,
  subscribeAuth: (cb) => {
    cb(null);
    return () => {};
  },
  getIdToken: async () => 'token-admin'
}));

vi.mock('../src/api/auth', () => ({
  fetchMe: async () => ({
    id: '1',
    email: 'admin@test.com',
    name: 'Admin',
    role: 'admin'
  }),
  syncUser: vi.fn()
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000/api');
  });

  it('shows summary stats', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/R\$ 100\.00/)).toBeInTheDocument();
    });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
