package com.github.gtn1024.bookreservation.model.dto;

public record UserLoginResponse(
        String token,
        CurrentUserDto user
) {
}
