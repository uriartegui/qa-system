package com.qasystem.backend.controllers;

import com.qasystem.backend.dtos.CreateUserDTO;
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

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

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
        return ResponseEntity.ok(users.stream().map(UserDTO::new).toList());
    }
}
