package com.qasystem.backend.dtos;

import com.qasystem.backend.entities.Role;
import com.qasystem.backend.entities.User;

import java.time.Instant;
import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private boolean active;
    private String organizationName;
    private Instant createdAt;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.active = user.getActive();
        this.organizationName = user.getOrganization().getName();
        this.createdAt = user.getCreatedAt();
    }
}
