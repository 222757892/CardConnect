package com.autofixpro.backend.controller;
//delete
import com.autofixpro.backend.domain.model.Booking;
import com.autofixpro.backend.domain.model.ContactMessage;
import com.autofixpro.backend.repository.BookingRepository;
import com.autofixpro.backend.repository.ContactRepository;
import com.autofixpro.backend.web.dto.BookingResponse;
import com.autofixpro.backend.web.dto.ContactResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final BookingRepository bookingRepository;
    private final ContactRepository contactRepository;

    public AdminController(BookingRepository bookingRepository, ContactRepository contactRepository) {
        this.bookingRepository = bookingRepository;
        this.contactRepository = contactRepository;
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponse>> listAllBookings() {
        List<BookingResponse> list = bookingRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<ContactResponse>> listAllContacts() {
        List<ContactResponse> list = contactRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        if (!contactRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contactRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private BookingResponse toDto(Booking b) {
        BookingResponse r = new BookingResponse();
        r.setId(b.getId());
        r.setFirstName(b.getFirstName());
        r.setLastName(b.getLastName());
        r.setEmail(b.getEmail());
        r.setPhone(b.getPhone());
        r.setYear(b.getYear());
        r.setMake(b.getMake());
        r.setModel(b.getModel());
        r.setServiceType(b.getServiceType());
        r.setDate(b.getDateRequested() != null ? b.getDateRequested().toString() : null);
        r.setTime(b.getTimeRequested());
        r.setNotes(b.getNotes());
        r.setCreatedAt(b.getCreatedAt());
        return r;
    }

    private ContactResponse toDto(ContactMessage c) {
        ContactResponse r = new ContactResponse();
        r.setId(c.getId());
        r.setName(c.getName());
        r.setPhone(c.getPhone());
        r.setEmail(c.getEmail());
        r.setVehicle(c.getVehicle());
        r.setMessage(c.getMessage());
        r.setCreatedAt(c.getCreatedAt());
        return r;
    }
}
