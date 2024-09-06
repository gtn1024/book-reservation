package com.github.gtn1024.bookreservation.model.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record BookReserveRequest(
        @NotNull UUID bookId,
        @NotNull String cardNumber,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate
) {
}
