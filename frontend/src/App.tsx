import { useCallback, useEffect, useState } from 'react';
import { fetchCompanies } from './api';
import type { Company } from './types';
import CompanyMap from './components/CompanyMap';
import CompanyForm from './components/CompanyForm';
import CompanyList from './components/CompanyList';

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadCompanies = useCallback(() => {
    fetchCompanies()
      .then(setCompanies)
      .catch((e: Error) => setError(e.message));
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <div className="app">
      <h1>customer-map</h1>
      {error && <p className="error">Fehler beim Laden: {error}</p>}
      <div className="map-container">
        <CompanyMap companies={companies} />
      </div>
      <div className="layout">
        <section className="panel">
          <h2>Firmen ({companies.length})</h2>
          <CompanyList companies={companies} />
        </section>
        <section className="panel">
          <h2>Neue Firma anlegen</h2>
          <CompanyForm onCreated={loadCompanies} />
        </section>
      </div>
    </div>
  );
}
