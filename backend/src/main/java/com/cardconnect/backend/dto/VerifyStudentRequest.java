package com.cardconnect.backend.dto;

public class VerifyStudentRequest {
    private String studentNumber;
    private String identificationNumber;
    private boolean agreedToTerms;

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }   

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }
}