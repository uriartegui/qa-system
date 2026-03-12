package com.qasystem.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OrganizationUpdateDTO {

    @NotBlank
    @Size(min = 3, max = 160)
    private String name;

    @Size(max = 500)
    private String description;

    @Size(max = 255)
    private String logoUrl;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

}
