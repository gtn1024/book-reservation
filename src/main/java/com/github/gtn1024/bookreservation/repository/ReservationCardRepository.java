package com.github.gtn1024.bookreservation.repository;

import com.github.gtn1024.bookreservation.entity.ReservationCard;
import com.github.gtn1024.bookreservation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReservationCardRepository extends JpaRepository<ReservationCard, UUID> {
    boolean existsByUser(User user);

    boolean existsByCardNumber(String cardNumber);
}