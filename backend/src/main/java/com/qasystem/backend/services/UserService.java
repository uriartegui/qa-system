package com.qasystem.backend.services;

import com.qasystem.backend.dtos.UpdateUserDTO;
import com.qasystem.backend.entities.*;
import com.qasystem.backend.repositories.OrganizationRepository;
import com.qasystem.backend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository,
                       OrganizationRepository organizationRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initAdmin() {
        if (userRepository.count() == 0) {
            System.out.println("Criando admin...");
            Organization org = new Organization();
            org.setName("Qualyra SA");
            org.setType(OrganizationType.BUSINESS);
            org.setPlan(OrganizationPlan.FREE);
            org = organizationRepository.save(org);
            System.out.println("Org ID: " + org.getId());

            User admin = new User();
            admin.setName("Admin Qualyra");
            admin.setEmail("admin@qualyra.dev");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setOrganization(org);
            admin.setActive(true);
            admin = userRepository.save(admin);
            System.out.println("Admin criado! ID: " + admin.getId());

        }
    }

    public User findByIdForOrg(UUID id, UUID orgId) {
        return userRepository.findByIdAndOrganization_Id(id, orgId)
                .orElseThrow(() -> new RuntimeException("User não encontrado"));
    }

    public List<User> findAllByOrganization(UUID orgId) {
        return userRepository.findByOrganization_Id(orgId);
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User ID " + id + " not found"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Transactional
    public User createUser(UUID organizationId, String name, String email,
                           String rawPassword, Role role, User requester) {

        if (requester.getRole() == Role.ADMIN && role != Role.MEMBER) {
            throw new IllegalArgumentException("ADMIN só pode criar MEMBER");
        }
        if (requester.getRole() == Role.MEMBER) {
            throw new IllegalArgumentException("MEMBER não pode criar usuários");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email já está em uso");
        }

        Organization org = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new IllegalArgumentException("Org não encontrada"));

        String passwordHash = passwordEncoder.encode(rawPassword);

        User user = new User(name, email, passwordHash, role, org);
        user.setActive(true);
        return userRepository.save(user);
    }

    @Transactional
    public User update(UUID id, UpdateUserDTO dto, User requester) {
        User user = findByIdForOrg(id, requester.getOrganization().getId());
        if (requester.getRole() != Role.OWNER && dto.getRole() != Role.MEMBER) {
            throw new IllegalArgumentException("Só OWNER altera ADMIN");
        }
        user.setName(dto.getName());
        user.setRole(dto.getRole());
        return userRepository.save(user);
    }

    @Transactional
    public User toggleActive(UUID id, User requester) {
        User user = findByIdForOrg(id, requester.getOrganization().getId());
        user.setActive(!user.isActive());
        return userRepository.save(user);
    }

    @Transactional
    public void softDelete(UUID id, User requester) {
        User user = findByIdForOrg(id, requester.getOrganization().getId());
        user.setActive(false);  // soft delete
        userRepository.save(user);
    }

}

