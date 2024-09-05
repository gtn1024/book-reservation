package com.github.gtn1024.bookreservation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "reservation_cards")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationCard extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "card_number", nullable = false, unique = true)
    private String cardNumber;
}
