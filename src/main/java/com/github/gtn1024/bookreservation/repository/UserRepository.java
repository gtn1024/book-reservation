package com.github.gtn1024.bookreservation.repository;

import com.github.gtn1024.bookreservation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByUsername(String username);

    User findByUsername(String username);
}