package com.qasystem.backend.repositories;

import com.qasystem.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByOrganizationId(UUID orgId);

    Optional<User> findByIdAndOrgId(UUID id, UUID orgId);

    List<User> findByOrganizationIdAndActiveTrue(UUID orgId);
}