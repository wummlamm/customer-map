package de.tomfreund.customermap.service;

import de.tomfreund.customermap.domain.Company;
import de.tomfreund.customermap.dto.CompanyDto;
import de.tomfreund.customermap.dto.CompanyMapper;
import de.tomfreund.customermap.dto.CreateCompanyRequest;
import de.tomfreund.customermap.exception.CompanyNotFoundException;
import de.tomfreund.customermap.repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    private CompanyService companyService;

    @BeforeEach
    void setUp() {
        companyService = new CompanyService(companyRepository, new CompanyMapper());
    }

    @Test
    void findAllReturnsMappedDtos() {
        when(companyRepository.findAll())
                .thenReturn(List.of(new Company("Rheinwerk Solutions GmbH", "info@example.com")));

        List<CompanyDto> result = companyService.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().name()).isEqualTo("Rheinwerk Solutions GmbH");
    }

    @Test
    void findByIdThrowsWhenCompanyDoesNotExist() {
        when(companyRepository.findById(42L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> companyService.findById(42L))
                .isInstanceOf(CompanyNotFoundException.class)
                .hasMessageContaining("42");
    }

    @Test
    void createMapsRequestAndReturnsDto() {
        when(companyRepository.save(any(Company.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        CompanyDto result = companyService.create(
                new CreateCompanyRequest("Domstadt Digital AG", "kontakt@example.com", List.of()));

        assertThat(result.name()).isEqualTo("Domstadt Digital AG");
        assertThat(result.email()).isEqualTo("kontakt@example.com");
    }
}
