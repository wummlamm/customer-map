package de.tomfreund.customermap.controller;

import de.tomfreund.customermap.dto.CompanyDto;
import de.tomfreund.customermap.dto.CreateCompanyRequest;
import de.tomfreund.customermap.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public List<CompanyDto> findAll() {
        return companyService.findAll();
    }

    @GetMapping("/{id}")
    public CompanyDto findById(@PathVariable Long id) {
        return companyService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CompanyDto create(@Valid @RequestBody CreateCompanyRequest request) {
        return companyService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        companyService.delete(id);
    }
}
