import { FormEvent, useState } from 'react';
import { createCompany } from '../api';

interface Props {
  onCreated: () => void;
}

const initialState = {
  name: '',
  email: '',
  street: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  latitude: '',
  longitude: '',
};

export default function CompanyForm({ onCreated }: Props) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(field: keyof typeof initialState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createCompany({
        name: form.name,
        email: form.email,
        addresses: [
          {
            street: form.street,
            houseNumber: form.houseNumber,
            postalCode: form.postalCode,
            city: form.city,
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
          },
        ],
      });
      setForm(initialState);
      onCreated();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input required value={form.name} onChange={(e) => update('name', e.target.value)} />
      </label>
      <label>
        E-Mail
        <input
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </label>
      <label>
        Straße
        <input required value={form.street} onChange={(e) => update('street', e.target.value)} />
      </label>
      <label>
        Hausnummer
        <input
          required
          value={form.houseNumber}
          onChange={(e) => update('houseNumber', e.target.value)}
        />
      </label>
      <label>
        PLZ
        <input
          required
          value={form.postalCode}
          onChange={(e) => update('postalCode', e.target.value)}
        />
      </label>
      <label>
        Stadt
        <input required value={form.city} onChange={(e) => update('city', e.target.value)} />
      </label>
      <label>
        Breitengrad (Latitude)
        <input
          required
          type="number"
          step="any"
          min="-90"
          max="90"
          value={form.latitude}
          onChange={(e) => update('latitude', e.target.value)}
        />
      </label>
      <label>
        Längengrad (Longitude)
        <input
          required
          type="number"
          step="any"
          min="-180"
          max="180"
          value={form.longitude}
          onChange={(e) => update('longitude', e.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Speichern…' : 'Anlegen'}
      </button>
    </form>
  );
}
