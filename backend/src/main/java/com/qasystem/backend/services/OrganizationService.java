package com.qasystem.backend.services;

import com.qasystem.backend.entities.Organization;
import com.qasystem.backend.entities.OrganizationPlan;
import com.qasystem.backend.entities.OrganizationType;
import com.qasystem.backend.repositories.OrganizationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.UUID;

@Service  // ← ADICIONA!
public class OrganizationService {

    private final OrganizationRepository repository;

    public OrganizationService(OrganizationRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Organization create(String name, OrganizationType type, OrganizationPlan plan) {
        Organization org = new Organization(name, type, plan);
        return repository.save(org);
    }

    @Transactional(readOnly = true)
    public List<Organization> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Organization findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Org não encontrada: " + id));
    }

    @Transactional
    public Organization update(UUID id, String name) {
        Organization org = findById(id);
        org.setName(name);
        return repository.save(org);
    }
}