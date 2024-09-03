package com.github.gtn1024.bookreservation.model.dto;

import com.github.gtn1024.bookreservation.entity.User;

import java.util.UUID;

public record CurrentUserDto(
        UUID id,
        String username,
        User.UserRole userRole
) {
    public static CurrentUserDto fromUser(User user) {
        return new CurrentUserDto(user.getId(), user.getUsername(), user.getUserRole());
    }
}
