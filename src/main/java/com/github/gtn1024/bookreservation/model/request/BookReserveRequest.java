package com.github.gtn1024.bookreservation.model.request;

import java.time.LocalDate;
import java.util.UUID;

public record BookReserveRequest(
        UUID bookId,
        String cardNumber,
        LocalDate startDate,
        LocalDate endDate
) {
}
