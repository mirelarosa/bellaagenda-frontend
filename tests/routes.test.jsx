import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from '../src/auth/AuthContext';
import { ProtectedRoute } from '../src/auth/ProtectedRoute';

function TestApp({ initialPath, profile }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <div>Admin Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="/cliente/servicos" element={<div>Cliente Servicos</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated user to login', async () => {
    render(<TestApp initialPath="/admin/dashboard" />);
    expect(await screen.findByText('Login Page')).toBeInTheDocument();
  });
});
