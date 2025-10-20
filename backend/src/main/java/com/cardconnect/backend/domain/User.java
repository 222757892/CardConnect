package com.cardconnect.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "app_user")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(length = 20, unique = true) // removed nullable=false
    protected String userId;

    @Enumerated(EnumType.STRING)
    protected Role role;

    protected String firstName;
    protected String lastName;
    protected String contactNumber;
    protected char gender;
    protected LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    protected IDType idType;

    protected String identificationNumber;
    protected boolean agreedToTerms; //will be removed later

    @Lob
    protected byte[] profilePhoto;

    public enum IDType {
        SA_ID,
        PASSPORT
    }

    public enum Role {
        ROLE_STUDENT,
        ROLE_ADMIN
    }

    protected User() {
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public Role getRole() {
        return role;
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

    public IDType getIdType() {
        return idType;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }

    public byte[] getProfilePhoto() {
        return profilePhoto;
    }

    public String getInstitutionalEmail() {
        return this.userId + "@mycput.ac.za";
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public void setIdType(IDType idType) {
        this.idType = idType;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    @Override
    public abstract String toString();
}
