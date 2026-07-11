package de.tomfreund.customermap.dto;

public record AddressDto(
        Long id,
        String street,
        String houseNumber,
        String postalCode,
        String city,
        double latitude,
        double longitude
) {
}
