package de.tomfreund.customermap.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record CreateCompanyRequest(
        @NotBlank String name,
        @Email String email,
        @Valid List<CreateAddressRequest> addresses
) {
}
