package com.github.gtn1024.bookreservation.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        @NotBlank String isbn,
        @NotBlank String title,
        @NotBlank String author,
        @NotBlank String publisher,
        @NotNull Integer year,
        @NotNull @Min(0) Integer quantity
) {
}
