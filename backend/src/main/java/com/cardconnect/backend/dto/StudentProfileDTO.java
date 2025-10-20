package com.cardconnect.backend.dto;

import java.time.LocalDate;

public class StudentProfileDTO {
    private Long id;
    private String userId; // is actually a student number
    private String firstName;
    private String lastName;
    private String contactNumber;
    private char gender;
    private LocalDate dateOfBirth;
    private String department;
    private String degree;
    private String school;
    private int yearOfStudy;
    private String email;

    // private String type; // new field for user type
    // private boolean agreedTermsAndConditions; // new field for agreement status
    private String role; // new field for user role

    // Constructor
    public StudentProfileDTO(Long id, String userId, String firstName, String lastName,
            String contactNumber, char gender, LocalDate dateOfBirth,
            String department, String degree, String school, int yearOfStudy,
            String email, String role) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.department = department;
        this.degree = degree;
        this.school = school;
        this.yearOfStudy = yearOfStudy;
        this.email = email;
        this.role = role;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public char getGender() {
        return gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getDepartment() {
        return department;
    }

    public String getDegree() {
        return degree;
    }

    public String getSchool() {
        return school;
    }

    public int getYearOfStudy() {
        return yearOfStudy;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public void setYearOfStudy(int yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }
}