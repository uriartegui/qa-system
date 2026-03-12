package com.qasystem.backend.controllers;

import com.qasystem.backend.dtos.OrganizationDTO;
import com.qasystem.backend.dtos.OrganizationUpdateDTO;
import com.qasystem.backend.entities.Role;
import com.qasystem.backend.entities.User;
import com.qasystem.backend.services.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService service;

    @GetMapping
    public ResponseEntity<OrganizationDTO> getCurrent(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                new OrganizationDTO(user.getOrganization())
        );
    }

    @PutMapping
    public ResponseEntity<OrganizationDTO> update(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody OrganizationUpdateDTO dto
    ) {
        var org = service.updateForOwner(
                user.getOrganization().getId(),
                dto,
                user
        );
        return ResponseEntity.ok(new OrganizationDTO(org));
    }

}
