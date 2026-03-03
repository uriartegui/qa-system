package com.qasystem.backend.services;

import com.qasystem.backend.dtos.NonConformityUpdateDTO;
import com.qasystem.backend.entities.*;
import com.qasystem.backend.repositories.NonConformityRepository;
import com.qasystem.backend.repositories.OrganizationRepository;
import com.qasystem.backend.repositories.UserRepository;
import com.qasystem.backend.repositories.exceptions.ForbiddenException;
import com.qasystem.backend.repositories.exceptions.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class NonConformityService {

    private final NonConformityRepository repository;
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;

    public NonConformityService(NonConformityRepository repository,
                                OrganizationRepository organizationRepository, UserRepository userRepository) {
        this.repository = repository;
        this.organizationRepository = organizationRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public NonConformity findByIdForCurrentUser(UUID id, User currentUser) {
        NonConformity nc = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NonConformity não encontrada"));

        // so vê da própria org + não deletado
        if (nc.isDeleted()
                || !nc.getOrganization().getId().equals(currentUser.getOrganization().getId())) {
            throw new ResourceNotFoundException("NonConformity não encontrada");
        }

        return nc;
    }

    @Transactional
    public NonConformity create(UUID organizationId,
                                String title,
                                String description,
                                String category,
                                NonConformitySeverity severity,
                                LocalDate dueDate,
                                User currentUser,
                                User assignedTo) {

        // usuário só cria na própria org
        Organization org = organizationRepository.findById(organizationId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization não encontrada"));

        if (!org.getId().equals(currentUser.getOrganization().getId())) {
            throw new ForbiddenException("Usuário não pertence à organização informada");
        }

        // MEMBER pode criar, ADMIN/OWNER também
        if (currentUser.getRole() == Role.MEMBER
                || currentUser.getRole() == Role.ADMIN
                || currentUser.getRole() == Role.OWNER) {

            NonConformity nc = new NonConformity(
                    org,
                    title,
                    description,
                    category,
                    severity,
                    currentUser,
                    assignedTo,
                    dueDate
            );
            return repository.save(nc);
        }

        throw new ForbiddenException("Usuário não tem permissão para criar não conformidade");
    }

    @Transactional(readOnly = true)
    public Page<NonConformity> findAllByCurrentUserOrg(User currentUser, Pageable pageable) {
        UUID orgId = currentUser.getOrganization().getId();
        return repository.findByOrganization_IdAndDeletedFalse(orgId, pageable);
    }

    @Transactional
    public NonConformity update(UUID id,
                                NonConformityUpdateDTO dto,
                                User currentUser) {

        NonConformity nc = findByIdForCurrentUser(id, currentUser);

        // MEMBER, ADMIN, OWNER podem editar
        if (currentUser.getRole() == Role.MEMBER
                || currentUser.getRole() == Role.ADMIN
                || currentUser.getRole() == Role.OWNER) {

            nc.setTitle(dto.getTitle());
            nc.setDescription(dto.getDescription());
            nc.setCategory(dto.getCategory());
            nc.setSeverity(dto.getSeverity());
            nc.setStatus(dto.getStatus());
            nc.setDueDate(dto.getDueDate());

            // se mudou assignedTo, valida que é da mesma org
            if (dto.getAssignedToId() != null) {
                User assignedTo = userRepository.findById(dto.getAssignedToId())
                        .filter(u -> u.getOrganization().getId().equals(currentUser.getOrganization().getId()))
                        .orElseThrow(() -> new ResourceNotFoundException("Usuário atribuído não encontrado na mesma organização"));
                nc.setAssignedTo(assignedTo);
            }

            return repository.save(nc);
        }

        throw new ForbiddenException("Usuário não tem permissão para editar não conformidade");
    }

    @Transactional
    public void deleteSoft(UUID id, User currentUser) {
        NonConformity nc = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NonConformity não encontrada"));

        // so mexe se for da mesma org
        if (!nc.getOrganization().getId().equals(currentUser.getOrganization().getId())) {
            throw new ForbiddenException("Usuário não pode acessar outra organização");
        }

        // so ADMIN ou OWNER podem excluir
        if (currentUser.getRole() == Role.ADMIN || currentUser.getRole() == Role.OWNER) {
            nc.softDelete();
        } else {
            throw new ForbiddenException("Usuário não tem permissão para excluir");
        }
    }
}
