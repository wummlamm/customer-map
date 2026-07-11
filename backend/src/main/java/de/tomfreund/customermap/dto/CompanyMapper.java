package de.tomfreund.customermap.dto;

import de.tomfreund.customermap.domain.Address;
import de.tomfreund.customermap.domain.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public CompanyDto toDto(Company company) {
        return new CompanyDto(
                company.getId(),
                company.getName(),
                company.getEmail(),
                company.getAddresses().stream().map(this::toDto).toList()
        );
    }

    public AddressDto toDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getStreet(),
                address.getHouseNumber(),
                address.getPostalCode(),
                address.getCity(),
                address.getLatitude(),
                address.getLongitude()
        );
    }

    public Company toEntity(CreateCompanyRequest request) {
        Company company = new Company(request.name(), request.email());
        if (request.addresses() != null) {
            request.addresses().stream()
                    .map(a -> new Address(a.street(), a.houseNumber(), a.postalCode(),
                            a.city(), a.latitude(), a.longitude()))
                    .forEach(company::addAddress);
        }
        return company;
    }
}
