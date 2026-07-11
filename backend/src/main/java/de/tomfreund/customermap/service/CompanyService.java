package de.tomfreund.customermap.service;

import de.tomfreund.customermap.domain.Company;
import de.tomfreund.customermap.dto.CompanyDto;
import de.tomfreund.customermap.dto.CompanyMapper;
import de.tomfreund.customermap.dto.CreateCompanyRequest;
import de.tomfreund.customermap.exception.CompanyNotFoundException;
import de.tomfreund.customermap.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    public CompanyService(CompanyRepository companyRepository, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
    }

    @Transactional(readOnly = true)
    public List<CompanyDto> findAll() {
        return companyRepository.findAll().stream()
                .map(companyMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public CompanyDto findById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
        return companyMapper.toDto(company);
    }

    public CompanyDto create(CreateCompanyRequest request) {
        Company saved = companyRepository.save(companyMapper.toEntity(request));
        return companyMapper.toDto(saved);
    }

    public void delete(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new CompanyNotFoundException(id);
        }
        companyRepository.deleteById(id);
    }
}
