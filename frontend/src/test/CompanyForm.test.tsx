import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CompanyForm from '../components/CompanyForm';

describe('CompanyForm', () => {
  it('rendert alle Pflichtfelder und den Submit-Button', () => {
    render(<CompanyForm onCreated={vi.fn()} />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Straße')).toBeRequired();
    expect(screen.getByLabelText('Stadt')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Anlegen' })).toBeInTheDocument();
  });
});
