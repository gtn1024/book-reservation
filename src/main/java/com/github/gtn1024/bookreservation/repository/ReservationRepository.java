package com.github.gtn1024.bookreservation.repository;

import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.entity.Reservation;
import com.github.gtn1024.bookreservation.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    Optional<Reservation> findByUserAndBookAndCreatedAtAfter(User user, Book book, LocalDateTime createdAt);

    Page<Reservation> findByUser(User user, Pageable pageable);
}