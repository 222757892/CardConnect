// package com.cardconnect.backend.service;

// import com.cardconnect.backend.domain.Student;
// import com.cardconnect.backend.domain.User;
// import com.cardconnect.backend.domain.UserAccount;
// import com.cardconnect.backend.domain.User.Role;
// import com.cardconnect.backend.repository.IUserAccountRepository;
// import com.cardconnect.backend.repository.IUserRepository;

// import org.junit.jupiter.api.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.security.core.Authentication;

// import java.time.LocalDate;
// import java.time.LocalDateTime;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
// class UserAccountServiceTest {

//     @Autowired
//     private UserAccountService userAccountService;

//     @Autowired
//     private StudentService studentService;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private IUserAccountRepository userAccountRepository;

//     @Autowired
//     private IUserRepository userRepository;

//     // NEW student details to avoid conflicts and ensure uniqueness
//     private static final String STUDENT_ID = "STU222222";
//     private static final String ID_NUMBER = "9902025022222";
//     private static final String PASSWORD = "Strong@222";

//     private static Long createdAccountId;

//     /**
//      * Create a student in the database to be used in signup.
//      */
//     @Test
//     @Order(1)
//     @Rollback(false)
//     void createStudentForSignup() {
//         Student student = new Student.Builder()
//                 .setUserId(STUDENT_ID)
//                 .setRole(Role.ROLE_STUDENT)
//                 .setFirstName("Nancy")
//                 .setLastName("Lancy")
//                 .setGender('F')
//                 .setContactNumber("0847611111")
//                 .setDateOfBirth(LocalDate.of(2002, 5, 22))
//                 .setIdType(User.IDType.SA_ID)
//                 .setIdentificationNumber(ID_NUMBER)
//                 .setAgreedToTerms(true)
//                 .setDepartment("Computer Science")
//                 .setDegree("BSc Information Technology")
//                 .setSchool("Science & IT")
//                 .setYearOfStudy(3)
//                 .build();

//         Student saved = studentService.create(student);
//         assertNotNull(saved);
//         assertEquals(STUDENT_ID, saved.getUserId());
//     }

//     /**
//      * Step 2: Complete signup with password.
//      */
//     @Test
//     @Order(3)
//     @Rollback(false)
//     void testCompleteSignup() {
//         UserAccount account = userAccountService.completeSignup(STUDENT_ID, PASSWORD);
//         assertNotNull(account);
//         assertEquals(STUDENT_ID + "@mycput.ac.za", account.getEmail());

//         // Save for later assertions
//         createdAccountId = account.getAccountId();
//     }

//     /**
//      * Step 3: Login with the credentials.
//      */
//     @Test
//     @Order(4)
//     void testLogin() {
//         UserAccount account = userAccountService.login(STUDENT_ID + "@mycput.ac.za", PASSWORD);
//         assertNotNull(account);
//         assertEquals(STUDENT_ID, account.getUser().getUserId());
//     }

//     /**
//      * Read account from database by ID.
//      */
//     @Test
//     @Order(5)
//     void testReadAccount() {
//         assertNotNull(createdAccountId);
//         UserAccount account = userAccountService.read(createdAccountId);
//         assertNotNull(account);
//         assertEquals(STUDENT_ID, account.getUser().getUserId());
//     }

//     @Test
//     @Order(6)
//     @Rollback(false)
//     void testUpdateCreatedAt() {
//         assertNotNull(createdAccountId, "Created account ID must not be null before updating");

//         // Read current UserAccount
//         UserAccount account = userAccountService.read(createdAccountId);
//         assertNotNull(account);

//         // New createdAt time (e.g., one day later)
//         LocalDateTime newCreatedAt = account.getCreatedAt().plusDays(1);

//         // Build updated UserAccount with new createdAt
//         UserAccount updatedAccount = new UserAccount.Builder()
//                 .copy(account)
//                 .setCreatedAt(newCreatedAt)
//                 .build();

//         // Save updated account
//         UserAccount savedAccount = userAccountService.update(updatedAccount);
//         assertNotNull(savedAccount);

//         // Verify updated createdAt
//         assertEquals(newCreatedAt, savedAccount.getCreatedAt());
//     }

//     /**
//      * Fetch all accounts and check that the newly created one exists.
//      */
//     @Test
//     @Order(7)
//     void testGetAllAccounts() {
//         var accounts = userAccountService.getAllUserAccounts();
//         assertFalse(accounts.isEmpty());

//         boolean exists = accounts.stream()
//                 .anyMatch(acc -> acc.getUser().getUserId().equals(STUDENT_ID));

//         assertTrue(exists);
//     }

//     /**
//      * Test changing password for an existing user account.
//      */
//     @Test
//     @Order(8)
//     @Rollback(false)
//     void testChangePassword() {

//         assertNotNull(createdAccountId, "Created account ID must not be null before changing password");

//         UserAccount account = userAccountService.read(createdAccountId);

//         // 1. Simulate logged-in user
//         String email = STUDENT_ID + "@mycput.ac.za";
//         String oldPassword = PASSWORD; // The correct plaintext password used during signup
//         String newPassword = "NewStrong@456";

//         // Ensure the password in DB matches the original password
//         assertTrue(passwordEncoder.matches(oldPassword, account.getPasswordHash()));

//         // Set up SecurityContext
//         UserDetails userDetails = org.springframework.security.core.userdetails.User
//                 .withUsername(email)
//                 .password("irrelevant") // won't be checked here
//                 .authorities("ROLE_STUDENT")
//                 .build();

//         Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//         SecurityContextHolder.getContext().setAuthentication(auth);

//         // 2. Attempt to change the password - FIXED: Added email as first argument
//         UserAccount updatedAccount = userAccountService.changePassword(email, oldPassword, newPassword);

//         assertNotNull(updatedAccount);
//         assertEquals(email, updatedAccount.getEmail());
//         assertTrue(passwordEncoder.matches(newPassword, updatedAccount.getPasswordHash()));

//         // 3. (Optional) Try logging in with new password
//         UserAccount loginWithNewPassword = userAccountService.login(email, newPassword);
//         assertNotNull(loginWithNewPassword);
//         assertEquals(STUDENT_ID, loginWithNewPassword.getUser().getUserId());
//     }

//     /**
//      * Delete the account and ensure it's gone.
//      */
//     @Test
//     @Order(9)
//     @Rollback(false)
//     void testDeleteAccount() {
//         boolean deleted = userAccountService.delete(createdAccountId);
//         assertTrue(deleted);

//         UserAccount deletedAccount = userAccountService.read(createdAccountId);
//         assertNull(deletedAccount);
//     }
// }