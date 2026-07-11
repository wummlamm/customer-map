package de.tomfreund.customermap.repository;

import de.tomfreund.customermap.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
