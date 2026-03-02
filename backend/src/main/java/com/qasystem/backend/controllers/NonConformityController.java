package com.qasystem.backend.controllers;

import com.qasystem.backend.dtos.NonConformityDTO;
import com.qasystem.backend.dtos.NonConformityInsertDTO;
import com.qasystem.backend.dtos.NonConformityUpdateDTO;
import com.qasystem.backend.entities.NonConformity;
import com.qasystem.backend.entities.User;
import com.qasystem.backend.services.NonConformityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/non-conformities")
public class NonConformityController {

    @Autowired
    private NonConformityService service;

    @PostMapping
    public ResponseEntity<NonConformityDTO> insert(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody NonConformityInsertDTO dto
    ) {
        NonConformity nc = service.create(
                currentUser.getOrganization().getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getCategory(),
                dto.getSeverity(),
                dto.getDueDate(),
                currentUser,
                null
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(new NonConformityDTO(nc));
    }

    @GetMapping
    public ResponseEntity<Page<NonConformityDTO>> findAll(
            @AuthenticationPrincipal User currentUser,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable
    ) {
        Page<NonConformity> page = service.findAllByCurrentUserOrg(currentUser, pageable);
        Page<NonConformityDTO> result = page.map(NonConformityDTO::new);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NonConformityDTO> findById(
            @AuthenticationPrincipal User currentUser,
            @PathVariable UUID id
    ) {
        NonConformity nc = service.findByIdForCurrentUser(id, currentUser);
        return ResponseEntity.ok(new NonConformityDTO(nc));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NonConformityDTO> update(
            @AuthenticationPrincipal User currentUser,
            @PathVariable UUID id,
            @Valid @RequestBody NonConformityUpdateDTO dto
    ) {
        NonConformity nc = service.update(id, dto, currentUser);
        return ResponseEntity.ok(new NonConformityDTO(nc));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal User currentUser,
            @PathVariable UUID id
    ) {
        service.deleteSoft(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}