package de.tomfreund.customermap.exception;

public class CompanyNotFoundException extends RuntimeException {

    public CompanyNotFoundException(Long id) {
        super("Company with id %d not found".formatted(id));
    }
}
