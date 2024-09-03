package com.github.gtn1024.bookreservation.service;

import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.repository.UserRepository;
import com.github.gtn1024.bookreservation.util.PasswordUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(String username, String password, User.UserRole userRole) {
        var salt = PasswordUtil.getSalt();
        var hashedPassword = PasswordUtil.hashPassword(password, salt);

        var user = new User(username, hashedPassword, salt, userRole);
        return userRepository.save(user);
    }

    public boolean isUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
