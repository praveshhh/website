package com.billspay.backend.service;

import com.billspay.backend.dto.VaultItemRequest;
import com.billspay.backend.model.VaultItem;
import com.billspay.backend.repository.VaultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VaultService {

    @Autowired
    private VaultRepository vaultRepository;

    public List<VaultItem> getItemsForUser(Long userId) {
        return vaultRepository.findByUserId(userId);
    }

    @Transactional
    public VaultItem saveItemForUser(Long userId, VaultItemRequest request) {
        VaultItem vaultItem = VaultItem.builder()
                .userId(userId)
                .itemName(request.getItemName())
                .encryptedPayload(request.getEncryptedPayload())
                .iv(request.getIv())
                .salt(request.getSalt())
                .build();

        return vaultRepository.save(vaultItem);
    }

    @Transactional
    public VaultItem updateItemForUser(Long userId, Long itemId, VaultItemRequest request) {
        VaultItem vaultItem = vaultRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Error: Vault item not found with ID: " + itemId));

        if (!vaultItem.getUserId().equals(userId)) {
            throw new SecurityException("Error: You are not authorized to update this item!");
        }

        vaultItem.setItemName(request.getItemName());
        vaultItem.setEncryptedPayload(request.getEncryptedPayload());
        vaultItem.setIv(request.getIv());
        vaultItem.setSalt(request.getSalt());

        return vaultRepository.save(vaultItem);
    }

    @Transactional
    public void deleteItemForUser(Long userId, Long itemId) {
        VaultItem vaultItem = vaultRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Error: Vault item not found with ID: " + itemId));

        if (!vaultItem.getUserId().equals(userId)) {
            throw new SecurityException("Error: You are not authorized to delete this item!");
        }

        vaultRepository.delete(vaultItem);
    }
}
