package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.User;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.repository.IUserAccountRepository;
import com.cardconnect.backend.repository.IUserRepository;
import com.cardconnect.backend.util.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.cardconnect.backend.security.JWTUtil;
import java.util.List;

@Service
public class UserAccountService implements IUserAccountService {

    private final IUserAccountRepository userAccountRepository;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserAccountService(IUserAccountRepository userAccountRepository,
            IUserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public boolean accountExistsForUserId(String userId) {
        return userAccountRepository.findByUser_UserId(userId).isPresent();
    }

    @Override
    public UserAccount completeSignup(String userId, String password) {
        if (!Helper.isValidPassword(password)) {
            throw new RuntimeException("Weak password");
        }

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (accountExistsForUserId(userId)) {
            throw new RuntimeException("Account already exists for this student");
        }

        String email = user.getInstitutionalEmail();
        String hashedPassword = passwordEncoder.encode(password);

        UserAccount account = new UserAccount.Builder()
                .setEmail(email)
                .setPasswordHash(hashedPassword)
                .setUser(user)
                .build();

        return userAccountRepository.save(account);
    }

    @Override
    public UserAccount login(String email, String rawPassword) {
        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

        if (!passwordEncoder.matches(rawPassword, account.getPasswordHash())) {
            throw new RuntimeException("Email or password is incorrect");
        }

        return account;
    }

    // @Override
    // public UserAccount login(String email, String rawPassword) {
    // UserAccount account = userAccountRepository.findByEmail(email)
    // .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

    // if (!passwordEncoder.matches(rawPassword, account.getPasswordHash())) {
    // throw new RuntimeException("Email or password is incorrect");
    // }

    // // Generate JWT
    // String token = jwtUtil.generateToken(email);
    // account.setToken(token); // this won't persist to DB, just returned

    // return account;
    // }

    @Override
    public UserAccount changePassword(String email, String oldPassword, String newPassword) {
        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!passwordEncoder.matches(oldPassword, account.getPasswordHash())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (!Helper.isValidPassword(newPassword)) {
            throw new RuntimeException("New password does not meet complexity requirements");
        }

        String hashedNewPassword = passwordEncoder.encode(newPassword);

        UserAccount updatedAccount = new UserAccount.Builder()
                .copy(account)
                .setPasswordHash(hashedNewPassword)
                .build();

        return userAccountRepository.save(updatedAccount);
    }

    @Override
    public UserAccount create(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    @Override
    public UserAccount read(Long accountId) {
        return userAccountRepository.findById(accountId).orElse(null);
    }

    @Override
    public UserAccount update(UserAccount userAccount) {
        if (userAccount == null || !userAccountRepository.existsById(userAccount.getAccountId())) {
            return null;
        }
        return userAccountRepository.save(userAccount);
    }

    @Override
    public boolean delete(Long accountId) {
        if (userAccountRepository.existsById(accountId)) {
            userAccountRepository.deleteById(accountId);
            return true;
        }
        return false;
    }

    @Override
    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }
}
