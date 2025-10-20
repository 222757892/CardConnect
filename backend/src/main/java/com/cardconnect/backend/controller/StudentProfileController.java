package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.dto.StudentProfileDTO;
import com.cardconnect.backend.service.IStudentService;
import com.cardconnect.backend.repository.IUserAccountRepository;
import org.springframework.security.core.Authentication;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class StudentProfileController {

    private final IStudentService studentService;
    private final IUserAccountRepository accountRepository;

    public StudentProfileController(IStudentService studentService, IUserAccountRepository accountRepository) {
        this.studentService = studentService;
        this.accountRepository = accountRepository;
    }

    @GetMapping(produces = "application/json")
    public StudentProfileDTO getStudentProfile(Authentication authentication) {
        String studentNumber = (String) authentication.getPrincipal(); // From JWT subject
        System.out.println("📥 Received profile request. studentNumber = " + studentNumber);

        if (studentNumber == null) {
            throw new RuntimeException("Unauthorized: Missing student number in JWT.");
        }

        Optional<Student> studentOpt = studentService.getByUserId(studentNumber);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found");
        }

        Student student = studentOpt.get();

        Optional<UserAccount> userAccount = accountRepository.findByUser(student);
        String email = userAccount.map(UserAccount::getEmail).orElse(student.getInstitutionalEmail());

        String role = "ROLE_STUDENT";

        return new StudentProfileDTO(
                student.getId(),
                student.getUserId(),
                student.getFirstName(),
                student.getLastName(),
                student.getContactNumber(),
                student.getGender(),
                student.getDateOfBirth(),
                student.getDepartment(),
                student.getDegree(),
                student.getSchool(),
                student.getYearOfStudy(),
                email,
                role);
    }

    @PutMapping(consumes = "application/json")
    public void updateStudentProfile(
            Authentication authentication,
            @RequestBody StudentProfileDTO updatedProfile) {

        String studentNumber = (String) authentication.getPrincipal();

        if (studentNumber == null) {
            throw new RuntimeException("Unauthorized: Missing student number in JWT.");
        }

        Student student = studentService.getByUserId(studentNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setContactNumber(updatedProfile.getContactNumber());

        Optional<UserAccount> optionalAccount = accountRepository.findByUser(student);
        if (optionalAccount.isPresent()) {
            UserAccount existingAccount = optionalAccount.get();

            UserAccount updatedAccount = new UserAccount.Builder()
                    .copy(existingAccount)
                    .setEmail(updatedProfile.getEmail())
                    .build();

            accountRepository.save(updatedAccount);
        }

        studentService.update(student);
    }

    @PutMapping(value = "/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePhoto(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file) {

        String studentNumber = (String) request.getAttribute("userId");

        if (studentNumber == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Missing student number in JWT.");
        }

        try {
            Student student = studentService.getByUserId(studentNumber)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            student.setProfilePhoto(file.getBytes());
            studentService.update(student);

            return ResponseEntity.ok("Photo uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    @GetMapping(value = "/photo")
    public ResponseEntity<byte[]> getProfilePhoto(HttpServletRequest request) {

        String studentNumber = (String) request.getAttribute("userId");

        if (studentNumber == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Student student = studentService.getByUserId(studentNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        byte[] photo = student.getProfilePhoto();
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(photo);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleProfileErrors(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("🔥 Profile error: " + ex.getMessage());
    }
}

// package com.cardconnect.backend.controller;

// import com.cardconnect.backend.domain.Student;
// import com.cardconnect.backend.domain.UserAccount;
// import com.cardconnect.backend.dto.StudentProfileDTO;
// import com.cardconnect.backend.service.IStudentService;
// import com.cardconnect.backend.repository.IUserAccountRepository;

// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.util.Optional;

// import org.springframework.http.*;
// import org.springframework.web.multipart.MultipartFile;
// import java.io.IOException;

// @RestController
// @RequestMapping("/api/profile")
// public class StudentProfileController {

// private final IStudentService studentService;
// private final IUserAccountRepository accountRepository;

// public StudentProfileController(IStudentService studentService,
// IUserAccountRepository accountRepository) {
// this.studentService = studentService;
// this.accountRepository = accountRepository;
// }

// @GetMapping(value = "/{studentNumber}", produces = "application/json")
// public StudentProfileDTO getStudentProfile(@PathVariable String
// studentNumber) {
// // studentNumber is actually userId internally
// Student student = studentService.getByUserId(studentNumber)
// .orElseThrow(() -> new RuntimeException("Student not found"));

// Optional<UserAccount> userAccount = accountRepository.findByUser(student);
// String email =
// userAccount.map(UserAccount::getEmail).orElse(student.getInstitutionalEmail());

// // Set default role "STUDENT"
// String role = "ROLE_STUDENT";

// return new StudentProfileDTO(
// student.getId(),
// student.getUserId(),
// student.getFirstName(),
// student.getLastName(),
// student.getContactNumber(),
// student.getGender(),
// student.getDateOfBirth(),
// student.getDepartment(),
// student.getDegree(),
// student.getSchool(),
// student.getYearOfStudy(),
// email,
// role);
// }

// @PutMapping(value = "/{studentNumber}", consumes = "application/json")
// public void updateStudentProfile(
// @PathVariable String studentNumber,
// @RequestBody StudentProfileDTO updatedProfile) {
// // Find student
// Student student = studentService.getByUserId(studentNumber)
// .orElseThrow(() -> new RuntimeException("Student not found"));

// // Update editable fields
// student.setContactNumber(updatedProfile.getContactNumber());

// // Optional: Update UserAccount email
// Optional<UserAccount> optionalAccount =
// accountRepository.findByUser(student);
// if (optionalAccount.isPresent()) {
// UserAccount existingAccount = optionalAccount.get();

// // Rebuild account with updated email using builder.copy()
// UserAccount updatedAccount = new UserAccount.Builder()
// .copy(existingAccount)
// .setEmail(updatedProfile.getEmail())
// .build();

// accountRepository.save(updatedAccount);
// }

// // Save student
// studentService.update(student);
// }

// @PutMapping(value = "/{studentNumber}/photo", consumes =
// MediaType.MULTIPART_FORM_DATA_VALUE)
// public ResponseEntity<String> uploadProfilePhoto(
// @PathVariable String studentNumber,
// @RequestParam("file") MultipartFile file) {
// try {
// Student student = studentService.getByUserId(studentNumber)
// .orElseThrow(() -> new RuntimeException("Student not found"));

// student.setProfilePhoto(file.getBytes());
// studentService.update(student); // <- Make sure this persists

// return ResponseEntity.ok("Photo uploaded successfully.");
// } catch (IOException e) {
// return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
// .body("Error processing file: " + e.getMessage());
// }
// }

// @GetMapping(value = "/{studentNumber}/photo")
// public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String
// studentNumber) {
// Student student = studentService.getByUserId(studentNumber)
// .orElseThrow(() -> new RuntimeException("Student not found"));

// byte[] photo = student.getProfilePhoto();
// if (photo == null) {
// return ResponseEntity.notFound().build();
// }

// return ResponseEntity.ok()
// .contentType(MediaType.IMAGE_JPEG) // Or IMAGE_PNG if needed
// .body(photo);
// }
// }