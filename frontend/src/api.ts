import type { Company, CreateCompanyRequest } from './types';

const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export async function fetchCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_URL}/api/companies`);
  if (!response.ok) {
    throw new Error(`Failed to load companies: ${response.status}`);
  }
  return response.json();
}

export async function createCompany(request: CreateCompanyRequest): Promise<Company> {
  const response = await fetch(`${API_URL}/api/companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error(`Failed to create company: ${response.status}`);
  }
  return response.json();
}
