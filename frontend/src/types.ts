export interface Address {
  id: number;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Company {
  id: number;
  name: string;
  email: string | null;
  addresses: Address[];
}

export interface CreateAddressRequest {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface CreateCompanyRequest {
  name: string;
  email: string;
  addresses: CreateAddressRequest[];
}
