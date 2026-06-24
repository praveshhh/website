package com.billspay.backend.controller;

import com.billspay.backend.dto.ContactRequest;
import com.billspay.backend.dto.MessageResponse;
import com.billspay.backend.model.ContactMessage;
import com.billspay.backend.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactRequest request) {
        try {
            ContactMessage message = ContactMessage.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .subject(request.getSubject())
                    .message(request.getMessage())
                    .status("NEW")
                    .build();

            contactRepository.save(message);

            return ResponseEntity.ok(new MessageResponse("Your message has been submitted successfully. Thank you!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
