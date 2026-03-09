package com.qasystem.backend.controllers;

import com.qasystem.backend.dtos.OrganizationDTO;
import com.qasystem.backend.entities.User;
import com.qasystem.backend.services.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
            @RequestBody OrganizationDTO dto
    ) {
        var org = service.update(user.getOrganization().getId(), dto.getName());
        return ResponseEntity.ok(new OrganizationDTO(org));
    }
}
