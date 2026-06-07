import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider } from '../src/auth/AuthContext';
import { ServicesPage } from '../src/pages/client/ServicesPage';

vi.mock('../src/config/firebase', () => ({
  isMock: true,
  subscribeAuth: (cb) => {
    cb({ uid: 'x', email: 'client@test.com' });
    return () => {};
  },
  getIdToken: async () => 'token-client',
  loginWithEmail: vi.fn(),
  registerWithEmail: vi.fn(),
  logoutFirebase: vi.fn()
}));

vi.mock('../src/api/auth', () => ({
  fetchMe: async () => ({
    id: '3',
    email: 'client@test.com',
    name: 'Client',
    role: 'client'
  }),
  syncUser: vi.fn()
}));

describe('ServicesPage', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000/api');
  });

  it('lists services from API', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ServicesPage />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Corte')).toBeInTheDocument();
    });
    expect(screen.getByText(/R\$ 50\.00/)).toBeInTheDocument();
  });
});
