package com.qasystem.backend.controllers;

import com.qasystem.backend.entities.*;
import com.qasystem.backend.repositories.OrganizationRepository;
import com.qasystem.backend.repositories.UserRepository;
import com.qasystem.backend.services.JwtService;
import com.qasystem.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            User user = userService.findByEmail(request.get("email"));
            if (!passwordEncoder.matches(request.get("password"), user.getPassword())) {
                return ResponseEntity.status(401).body(Map.of("error", "Credenciais inválidas"));
            }
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(Map.of("token", token, "user", user));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Erro login"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            // Cria org nova
            Organization org = new Organization();
            org.setName(request.get("orgName"));
            org.setType(OrganizationType.BUSINESS);
            org.setPlan(OrganizationPlan.FREE);
            org = organizationRepository.save(org);

            // Cria OWNER
            User owner = new User(
                    request.get("name"),
                    request.get("email"),
                    passwordEncoder.encode(request.get("password")),
                    Role.OWNER,
                    org
            );
            owner.setActive(true);
            userRepository.save(owner);

            String token = jwtService.generateToken(owner);
            return ResponseEntity.ok(Map.of("token", token, "user", owner));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Erro no registro: " + e.getMessage()));
        }
    }
}