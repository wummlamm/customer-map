import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import type { Company } from '../types';

const demoCompanies: Company[] = [
  {
    id: 1,
    name: 'Rheinwerk Solutions GmbH',
    email: 'info@example.com',
    addresses: [
      {
        id: 1,
        street: 'Königsallee',
        houseNumber: '92',
        postalCode: '40212',
        city: 'Düsseldorf',
        latitude: 51.2216,
        longitude: 6.7794,
      },
    ],
  },
];

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(demoCompanies),
      }),
    );
  });

  it('lädt Firmen und zeigt sie in der Liste an', async () => {
    render(<App />);
    expect(await screen.findByText('Rheinwerk Solutions GmbH')).toBeInTheDocument();
    expect(screen.getByText(/Firmen \(1\)/)).toBeInTheDocument();
  });
});
