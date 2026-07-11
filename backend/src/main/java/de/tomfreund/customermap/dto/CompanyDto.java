package de.tomfreund.customermap.dto;

import java.util.List;

public record CompanyDto(
        Long id,
        String name,
        String email,
        List<AddressDto> addresses
) {
}
