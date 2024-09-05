package com.github.gtn1024.bookreservation.service;

import com.github.gtn1024.bookreservation.entity.ReservationCard;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.repository.ReservationCardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ReservationCardService {
    private final ReservationCardRepository reservationCardRepository;
    private final UserService userService;

    public ReservationCardService(ReservationCardRepository reservationCardRepository, UserService userService) {
        this.reservationCardRepository = reservationCardRepository;
        this.userService = userService;
    }

    @Transactional(rollbackFor = Exception.class)
    public ReservationCard createReservationCard(UUID userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if (reservationCardRepository.existsByUser(user)) {
            throw new IllegalArgumentException("Reservation card already exists");
        }

        ReservationCard reservationCard = new ReservationCard();
        reservationCard.setUser(user);

        String cardNumber;
        do {
            cardNumber = generateCardNumber();
        } while (reservationCardRepository.existsByCardNumber(cardNumber));
        reservationCard.setCardNumber(cardNumber);

        return reservationCardRepository.save(reservationCard);
    }

    public ReservationCard getReservationCardByUser(User user) {
        return reservationCardRepository.findByUser(user).orElse(null);
    }

    private String generateCardNumber() {
        long l = System.currentTimeMillis() + LocalDateTime.now().getNano();
        return String.valueOf(l);
    }
}
