import type { Company } from '../types';

interface Props {
  companies: Company[];
}

export default function CompanyList({ companies }: Props) {
  if (companies.length === 0) {
    return <p>Noch keine Firmen vorhanden.</p>;
  }
  return (
    <ul className="company-list">
      {companies.map((company) => (
        <li key={company.id}>
          <strong>{company.name}</strong>
          {company.addresses[0] && (
            <>
              {' – '}
              {company.addresses[0].city}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
