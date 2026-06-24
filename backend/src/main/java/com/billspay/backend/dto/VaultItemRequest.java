package com.billspay.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VaultItemRequest {
    @NotBlank
    private String itemName;

    @NotBlank
    private String encryptedPayload;

    @NotBlank
    private String iv;

    @NotBlank
    private String salt;
}
