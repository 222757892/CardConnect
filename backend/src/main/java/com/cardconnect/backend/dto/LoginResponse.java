package com.cardconnect.backend.dto;

import com.cardconnect.backend.domain.User;

public class LoginResponse {
    private String token;
    private String email;
    private String userId;
    private String firstName;
    private String lastName;
    private User.Role role; // assuming you use enum Role

    public LoginResponse(String token, String email, String userId, String firstName, String lastName, User.Role role) {
        this.token = token;
        this.email = email;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }
}
