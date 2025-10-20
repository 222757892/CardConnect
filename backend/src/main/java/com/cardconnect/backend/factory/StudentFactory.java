package com.cardconnect.backend.factory;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User.IDType;
import com.cardconnect.backend.util.Helper;
import com.cardconnect.backend.domain.User.Role;

import java.time.LocalDate;

public class StudentFactory {

    /**
     * Creates a new Student domain object using validated input.
     * 
     * Sets fixed attributes like the Role.STUDENT.
     * 
     * Prevents invalid student objects from being built.
     */

    public static Student createStudent(
            String userId,
            String firstName,
            String lastName,
            // String email,
            // String password,
            String contactNumber,
            char gender,
            LocalDate dateOfBirth,
            IDType idType,
            String identificationNumber,
            boolean agreedToTerms,
            byte[] profilePhoto,
            String department,
            String degree,
            String school,
            int yearOfStudy) {

        // Generate userID based on DOB
        // String userID = Helper.generateUserID(dateOfBirth);

        // Validate userID (student number) explicitly
        if (!Helper.isValidUserID(userId)) {
            System.out.println("Invalid userID: " + userId);
            return null;
        }

        // Debug validation checks
        System.out.println("Validation Debug:");
        System.out.println("User ID valid: " + Helper.isValidUserID(userId));
        System.out.println("First name valid: " + Helper.isValidString(firstName));
        System.out.println("Last name valid: " + Helper.isValidString(lastName));
        // System.out.println("Email valid: " + Helper.isValidEmail(email));
        // System.out.println("Password valid: " + Helper.isValidPassword(password));
        System.out.println("Contact valid: " + Helper.isValidContactNumber(contactNumber));
        System.out.println("Gender valid: " + (gender == 'M' || gender == 'F'));
        System.out.println("DOB valid: " + Helper.isValidDateOfBirth(dateOfBirth));
        System.out.println("IDType valid: " + Helper.isValidIdType(idType));
        System.out.println("Identification number valid: " + Helper.isNotEmpty(identificationNumber));
        System.out.println("Agreed to terms: " + agreedToTerms);
        System.out.println("Department valid: " + Helper.isNotEmpty(department));
        System.out.println("Degree valid: " + Helper.isNotEmpty(degree));
        System.out.println("School valid: " + Helper.isNotEmpty(school));
        System.out.println("Year of study valid: " + (yearOfStudy > 0));

        // If any validation fails, return null
        if (!Helper.isValidUserID(userId)
                || !Helper.isValidString(firstName)
                || !Helper.isValidString(lastName)
                // || !Helper.isValidEmail(email)
                // || !Helper.isValidPassword(password)
                || !Helper.isValidContactNumber(contactNumber)
                || !(gender == 'M' || gender == 'F')
                || !Helper.isValidDateOfBirth(dateOfBirth)
                || !Helper.isValidIdType(idType)
                || !Helper.isNotEmpty(identificationNumber)
                || !agreedToTerms
                || !Helper.isNotEmpty(department)
                || !Helper.isNotEmpty(degree)
                || !Helper.isNotEmpty(school)
                || yearOfStudy <= 0) {

            return null;
        }

        // ✅ Build the student with passed userID
        Student student = new Student.Builder()
                .setUserId(userId)
                .setRole(Role.ROLE_STUDENT) // Set role
                .setFirstName(firstName)
                .setLastName(lastName)
                // .setEmail(email)
                // .setPassword(password)
                .setContactNumber(contactNumber)
                .setGender(gender)
                .setDateOfBirth(dateOfBirth)
                .setIdType(idType)
                .setIdentificationNumber(identificationNumber)
                .setAgreedToTerms(agreedToTerms)
                .setProfilePhoto(profilePhoto)
                .setDepartment(department)
                .setDegree(degree)
                .setSchool(school)
                .setYearOfStudy(yearOfStudy)
                .build();

        // Print the result
        System.out.println("Created Student - Factory: " + student);

        return student;
    }
}