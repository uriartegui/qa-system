package com.qasystem.backend.controllers;

import com.qasystem.backend.dtos.CreateUserDTO;
import com.qasystem.backend.dtos.UpdateUserDTO;
import com.qasystem.backend.dtos.UserDTO;
import com.qasystem.backend.entities.User;
import com.qasystem.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(
            @AuthenticationPrincipal User requester,
            @PathVariable UUID id
    ) {
        User user = userService.findByIdForOrg(id, requester.getOrganization().getId());
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(
            @AuthenticationPrincipal User requester,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserDTO dto
    ) {
        User user = userService.update(id, dto, requester);
        return ResponseEntity.ok(new UserDTO(user));
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<UserDTO> toggleStatus(
            @AuthenticationPrincipal User requester,
            @PathVariable UUID id
    ) {
        User user = userService.toggleActive(id, requester);
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PostMapping
    public ResponseEntity<UserDTO> create(
            @AuthenticationPrincipal User requester,
            @Valid @RequestBody CreateUserDTO dto
    ) {
        User newUser = userService.createUser(
                requester.getOrganization().getId(),
                dto.getName(),
                dto.getEmail(),
                dto.getPassword(),
                dto.getRole(),
                requester
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(newUser));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> list(@AuthenticationPrincipal User requester) {
        List<User> users = userService.findAllByOrganization(requester.getOrganization().getId());
        return ResponseEntity.ok(
                users.stream().map(UserDTO::new).collect(Collectors.toList())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal User requester,
            @PathVariable UUID id
    ) {
        userService.softDelete(id, requester);
        return ResponseEntity.noContent().build();
    }
}
