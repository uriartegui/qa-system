package com.qasystem.backend.repositories;

import com.qasystem.backend.entities.NonConformity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NonConformityRepository extends JpaRepository<NonConformity, UUID> {

    Page<NonConformity>findByOrganization_IdAndDeletedFalse(UUID organizationId, Pageable pageable);

}
