package com.qasystem.backend.dtos;

import com.qasystem.backend.entities.Organization;
import com.qasystem.backend.entities.OrganizationPlan;
import com.qasystem.backend.entities.OrganizationType;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.UUID;

public class OrganizationDTO {

    private UUID id;
    private String name;
    private OrganizationType type;
    private OrganizationPlan plan;
    private Instant createdAt;

    @Size(max = 500)
    private String description;

    @Size(max = 255)
    private String logoUrl;

    public OrganizationDTO(Organization org) {
        this.id = org.getId();
        this.name = org.getName();
        this.type = org.getType();
        this.plan = org.getPlan();
        this.description = org.getDescription();
        this.logoUrl = org.getLogoUrl();
        this.createdAt = org.getCreatedAt();
    }

    // Getters e Setters

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public OrganizationType getType() { return type; }

    public void setType(OrganizationType type) { this.type = type; }

    public OrganizationPlan getPlan() { return plan; }

    public void setPlan(OrganizationPlan plan) { this.plan = plan; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public Instant getCreatedAt() { return createdAt; }

    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

}