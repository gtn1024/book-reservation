package com.github.gtn1024.bookreservation.service;

import cn.dev33.satoken.stp.StpUtil;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.exception.AppException;
import com.github.gtn1024.bookreservation.model.dto.CurrentUserDto;
import com.github.gtn1024.bookreservation.model.dto.UserLoginResponse;
import com.github.gtn1024.bookreservation.util.PasswordUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public void registerUser(String username, String password) {
        if (userService.isUsernameExists(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        userService.createUser(username, password, User.UserRole.USER);
    }

    public UserLoginResponse loginUser(String username, String password) {
        var user = userService.getUserByUsername(username);
        if (user == null) {
            throw new AppException("用户不存在", 403);
        }
        if (!PasswordUtil.checkPassword(password, user.getSalt(), user.getPassword())) {
            throw new AppException("密码错误", 403);
        }

        StpUtil.login(user.getId(), 604800L);

        var token = StpUtil.getTokenInfo().getTokenValue();
        return new UserLoginResponse(token, CurrentUserDto.fromUser(user));
    }

    public CurrentUserDto getCurrentUser() {
        var userId = UUID.fromString(StpUtil.getLoginId().toString());
        var user = userService.getUserById(userId);
        return CurrentUserDto.fromUser(user);
    }
}
