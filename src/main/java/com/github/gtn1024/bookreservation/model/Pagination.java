package com.github.gtn1024.bookreservation.model;

public record Pagination(
        Integer current,
        Integer pageSize,
        Long total,
        Integer pages
) {
}
