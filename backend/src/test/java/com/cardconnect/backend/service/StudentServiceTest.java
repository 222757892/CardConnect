// package com.cardconnect.backend.service;

// import com.cardconnect.backend.domain.Student;
// import com.cardconnect.backend.domain.User.Role;
// import org.junit.jupiter.api.*;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;

// import java.time.LocalDate;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
// class StudentServiceTest {

//     @Autowired
//     private StudentService studentService;

//     private static Student student;

//     @BeforeAll
//     static void setup() {
//         student = new Student.Builder()
//                 .setUserId("STU000009")
//                 .setRole(Role.ROLE_STUDENT)
//                 .setFirstName("Linda")
//                 .setLastName("Doe")
//                 .setContactNumber("0789097777")
//                 .setGender('F')
//                 .setDateOfBirth(LocalDate.of(2001, 5, 23))
//                 .setIdType(Student.IDType.SA_ID)
//                 .setIdentificationNumber("9331678777087")
//                 .setAgreedToTerms(true)
//                 .setDepartment("Accounting")
//                 .setDegree("Bachelor of Commerce (BCom)")
//                 .setSchool("Cape Peninsula University of Technology")
//                 .setYearOfStudy(1)
//                 .build();
//     }

//     @Test
//     @Order(1)
//     @Rollback(false) // Keep data for next tests
//     void testCreateStudent() {
//         student = studentService.create(student); // Save the created student with ID
//         assertNotNull(student);
//         assertEquals("STU000009", student.getUserId());
//     }

//     @Test
//     @Order(2)
//     void testReadStudent() {
//         Student read = studentService.read(student.getId()); // Use dynamic ID
//         assertNotNull(read);
//         assertEquals("Linda", read.getFirstName()); // Updated to match the test student
//     }

//     @Test
//     @Order(3)
//     @Rollback(false)
//     void testUpdateStudent() {
//         Student existing = studentService.read(student.getId()); // Use dynamic ID
//         Student updated = new Student.Builder()
//                 .copy(existing)
//                 .setYearOfStudy(3)
//                 .build();

//         updated.setId(existing.getId()); // Ensure ID is set for update

//         Student saved = studentService.update(updated);
//         assertEquals(3, saved.getYearOfStudy()); // Check correct year
//     }

//     @Test
//     @Order(4)
//     void testGetAllStudents() {
//         List<Student> all = studentService.getAllStudents();
//         assertFalse(all.isEmpty());
//         System.out.println("Students in DB: " + all.size());
//     }

//     @Test
//     @Order(5)
//     void testVerifyStudentIdentity() {
//         // Positive case: matching studentNumber and identificationNumber
//         Optional<Student> studentOpt = studentService.verifyStudentIdentity("STU000009", "9331678777087");
//         assertTrue(studentOpt.isPresent());
//         assertEquals("STU000009", studentOpt.get().getUserId());

//         // Negative case: wrong identificationNumber
//         Optional<Student> wrongIdOpt = studentService.verifyStudentIdentity("STU000009", "WRONGID123456");
//         assertTrue(wrongIdOpt.isEmpty());

//         // Negative case: non-existent studentNumber
//         Optional<Student> nonExistentOpt = studentService.verifyStudentIdentity("NONEXISTENT", "9331678575087");
//         assertTrue(nonExistentOpt.isEmpty());
//     }

//     // Uncomment if delete functionality is needed
//     // @Test
//     // @Order(6)
//     // @Rollback(false)
//     // void testDeleteStudent() {
//     // boolean deleted = studentService.delete(student.getId()); // Use dynamic ID
//     // assertTrue(deleted);
//     // assertNull(studentService.read(student.getId()));
//     // }
// }