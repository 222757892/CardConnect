// src/main/java/com/cardconnect/controller/AdminController.java
package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Admin;
import com.cardconnect.backend.dto.AdminSignupRequest;
import com.cardconnect.backend.dto.AdminLoginRequest;
import com.cardconnect.backend.service.AdminService;
import com.cardconnect.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Admin> signup(@RequestBody AdminSignupRequest request) {
        Admin created = adminService.signup(request);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody AdminLoginRequest request) {
        Admin admin = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(admin);
    }
}
