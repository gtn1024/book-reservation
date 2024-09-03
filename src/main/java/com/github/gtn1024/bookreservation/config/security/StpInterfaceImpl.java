package com.github.gtn1024.bookreservation.config.security;

import cn.dev33.satoken.stp.StpInterface;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.service.UserService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class StpInterfaceImpl implements StpInterface {
    private final UserService userService;

    public StpInterfaceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return List.of();
    }

    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        var userId = UUID.fromString(loginId.toString());
        var user = userService.getUserById(userId);
        if (user == null) {
            return List.of();
        }
        var role = user.getUserRole();
        List<String> list = new ArrayList<>();
        if (role == User.UserRole.ADMIN) {
            list.add("ADMIN");
        }
        list.add("USER");
        return list;
    }
}
