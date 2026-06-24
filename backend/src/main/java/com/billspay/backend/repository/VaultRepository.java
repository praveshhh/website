package com.billspay.backend.repository;

import com.billspay.backend.model.VaultItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VaultRepository extends JpaRepository<VaultItem, Long> {
    List<VaultItem> findByUserId(Long userId);
}
