package com.billspay.backend.controller;

import com.billspay.backend.dto.MessageResponse;
import com.billspay.backend.dto.VaultItemRequest;
import com.billspay.backend.model.VaultItem;
import com.billspay.backend.security.services.UserDetailsImpl;
import com.billspay.backend.service.VaultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/vault")
public class VaultController {

    @Autowired
    private VaultService vaultService;

    @GetMapping
    public ResponseEntity<List<VaultItem>> getVaultItems(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }
        List<VaultItem> items = vaultService.getItemsForUser(userDetails.getId());
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<?> addVaultItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody VaultItemRequest request) {
        
        if (userDetails == null) {
            return ResponseEntity.status(401).body(new MessageResponse("Unauthorized"));
        }

        try {
            VaultItem savedItem = vaultService.saveItemForUser(userDetails.getId(), request);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVaultItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody VaultItemRequest request) {
        
        if (userDetails == null) {
            return ResponseEntity.status(401).body(new MessageResponse("Unauthorized"));
        }

        try {
            VaultItem updatedItem = vaultService.updateItemForUser(userDetails.getId(), id, request);
            return ResponseEntity.ok(updatedItem);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVaultItem(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        
        if (userDetails == null) {
            return ResponseEntity.status(401).body(new MessageResponse("Unauthorized"));
        }

        try {
            vaultService.deleteItemForUser(userDetails.getId(), id);
            return ResponseEntity.ok(new MessageResponse("Vault item deleted successfully."));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
