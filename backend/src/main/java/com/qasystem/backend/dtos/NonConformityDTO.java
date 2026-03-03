package com.qasystem.backend.dtos;

import com.qasystem.backend.entities.NonConformity;
import com.qasystem.backend.entities.NonConformitySeverity;
import com.qasystem.backend.entities.NonConformityStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public class NonConformityDTO {

    private UUID id;
    private UUID organizationId;
    private String title;
    private String description;
    private String category;
    private NonConformitySeverity severity;
    private NonConformityStatus status;
    private UUID createdById;
    private UUID assignedToId;
    private Instant createdAt;
    private Instant updatedAt;
    private LocalDate dueDate;

    public NonConformityDTO() {
    }

    public NonConformityDTO(UUID id,
                            UUID organizationId,
                            String title,
                            String description,
                            String category,
                            NonConformitySeverity severity,
                            NonConformityStatus status,
                            UUID createdById,
                            UUID assignedToId,
                            Instant createdAt,
                            Instant updatedAt,
                            LocalDate dueDate) {
        this.id = id;
        this.organizationId = organizationId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.severity = severity;
        this.status = status;
        this.createdById = createdById;
        this.assignedToId = assignedToId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.dueDate = dueDate;
    }

    public NonConformityDTO(NonConformity entity) {
        this.id = entity.getId();
        this.organizationId = entity.getOrganization().getId();
        this.title = entity.getTitle();
        this.description = entity.getDescription();
        this.category = entity.getCategory();
        this.severity = entity.getSeverity();
        this.status = entity.getStatus();
        this.createdById = entity.getCreatedBy().getId();
        this.assignedToId = entity.getAssignedTo() != null ? entity.getAssignedTo().getId() : null;
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
        this.dueDate = entity.getDueDate();
    }

    public UUID getId() {
        return id;
    }

    public UUID getOrganizationId() {
        return organizationId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public NonConformitySeverity getSeverity() {
        return severity;
    }

    public NonConformityStatus getStatus() {
        return status;
    }

    public UUID getCreatedById() {
        return createdById;
    }

    public UUID getAssignedToId() {
        return assignedToId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }
}
