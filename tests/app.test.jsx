import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from '../src/auth/AuthContext';
import { HomePage } from '../src/pages/public/HomePage';

describe('HomePage', () => {
  it('renders BellaAgenda title', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /BellaAgenda/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Começar/i })).toBeInTheDocument();
  });
});
