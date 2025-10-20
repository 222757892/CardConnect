package com.cardconnect.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId; // Now a generated Long ID (primary key)

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private LocalDateTime createdAt;

    @Transient
    private String token; // ✅ JWT token (not persisted in DB)

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id") // FK to User PK
    private User user;

    protected UserAccount() {
        // JPA requires no-arg constructor
    }

    private UserAccount(Builder builder) {
        this.accountId = builder.accountId;
        this.email = builder.email;
        this.passwordHash = builder.passwordHash;
        this.createdAt = builder.createdAt != null ? builder.createdAt : LocalDateTime.now();
        this.user = builder.user;
        this.token = builder.token;
    }

    // === Getters ===

    public Long getAccountId() {
        return accountId;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "UserAccount{" +
                "accountId=" + accountId +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                ", user=" + (user != null ? user.getUserId() : null) +
                '}';
    }

    // ✅ Builder Class
    public static class Builder {
        private Long accountId;
        private String email;
        private String passwordHash;
        private LocalDateTime createdAt;
        private User user;
        private String token; // ✅ Add token to builder for convenience

        public Builder setAccountId(Long accountId) {
            this.accountId = accountId;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Builder setToken(String token) {
            this.token = token;
            return this;
        }

        public Builder copy(UserAccount userAccount) {
            this.accountId = userAccount.getAccountId();
            this.email = userAccount.getEmail();
            this.passwordHash = userAccount.getPasswordHash();
            this.createdAt = userAccount.getCreatedAt();
            this.user = userAccount.getUser();
            this.token = userAccount.getToken();
            return this;
        }

        public UserAccount build() {
            return new UserAccount(this);
        }
    }
}