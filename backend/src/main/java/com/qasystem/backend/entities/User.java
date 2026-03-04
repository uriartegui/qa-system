package com.qasystem.backend.entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_users_email", columnNames = "email")
        }
)
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, updatable = false, columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name", nullable = false, length = 160)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 160)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private Role role;

    @Column(name = "active", nullable = false)
    private boolean active;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false, columnDefinition = "UUID")
    private Organization organization;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public User() {
    }

    public User(String name,
                String email,
                String password,
                Role role,
                Organization organization) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.organization = organization;
        this.active = true;
        this.createdAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {  // ← NOVO
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {  // ← NOVO
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {  // ← NOVO
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {  // ← NOVO
        return true;
    }

    @Override
    public boolean isEnabled() {  // ← NOVO
        return this.active;
    }

    // GETTERS E SETTERS

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
