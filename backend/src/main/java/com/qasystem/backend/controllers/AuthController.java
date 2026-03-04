package com.qasystem.backend.controllers;

import com.qasystem.backend.entities.User;
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
}