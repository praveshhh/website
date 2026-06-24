package com.billspay.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vault_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VaultItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotBlank
    @Column(name = "item_name", nullable = false)
    private String itemName;

    /**
     * The E2EE encrypted payload, base64 encoded.
     */
    @NotBlank
    @Lob
    @Column(name = "encrypted_payload", nullable = false, length = 65535)
    private String encryptedPayload;

    /**
     * Initialization Vector (IV) used for AES-GCM, base64 encoded.
     */
    @NotBlank
    @Column(nullable = false)
    private String iv;

    /**
     * Salt used for key derivation, base64 encoded.
     */
    @NotBlank
    @Column(nullable = false)
    private String salt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
