package com.qasystem.backend.dtos;

import com.qasystem.backend.entities.Role;

public class UpdateUserDTO {

    private String name;

    private Role role;

    // getters/setters


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
