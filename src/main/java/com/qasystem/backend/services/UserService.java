package com.qasystem.backend.services;

import com.qasystem.backend.entities.Organization;
import com.qasystem.backend.entities.Role;
import com.qasystem.backend.entities.User;
import com.qasystem.backend.repositories.OrganizationRepository;
import com.qasystem.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    public UserService(UserRepository userRepository,
                       OrganizationRepository organizationRepository) {
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public User createUser(UUID organizationId,
                           String name,
                           String email,
                           String rawPassword,
                           Role role,
                           User requester) {

        // OWNER pode criar ADMIN e MEMBER
        // ADMIN só pode criar MEMBER
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
                .orElseThrow(() -> new IllegalArgumentException("Organization não encontrada"));

        // Próximo passo: aplicar BCrypt aqui e guardar o hash
        String passwordHash = rawPassword; // placeholder

        User user = new User(name, email, passwordHash, role, org);
        return userRepository.save(user);
    }
}

