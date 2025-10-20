package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService {

    private final IStudentRepository repository;

    @Autowired
    public StudentService(IStudentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Student create(Student student) {
        return repository.save(student);
    }

    @Override
    public Student read(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Student update(Student student) {
        return repository.save(student);
    }

    @Override
    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    @Override
    public Optional<Student> verifyStudentIdentity(String studentNumber, String identificationNumber) {
        return repository.findByUserIdAndIdentificationNumber(studentNumber, identificationNumber);
    }

    @Override
    public Optional<Student> findByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public Optional<Student> getByUserId(String userId) {
        return repository.findByUserId(userId);
    }
}