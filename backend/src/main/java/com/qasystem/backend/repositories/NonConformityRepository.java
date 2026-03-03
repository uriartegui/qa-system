package com.qasystem.backend.repositories;

import com.qasystem.backend.entities.NonConformity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface NonConformityRepository extends CrudRepository<NonConformity, UUID> {

    Page<NonConformity>     findByOrganization_IdAndDeletedFalse(UUID organizationId, Pageable pageable);

}
