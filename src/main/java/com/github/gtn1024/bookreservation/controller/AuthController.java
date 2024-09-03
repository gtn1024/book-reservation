package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.model.dto.UserLoginResponse;
import com.github.gtn1024.bookreservation.model.request.UserAuthRequest;
import com.github.gtn1024.bookreservation.service.AuthService;
import com.github.gtn1024.bookreservation.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public void register(@Valid @RequestBody UserAuthRequest request) {
        authService.registerUser(request.username(), request.password());
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@Valid @RequestBody UserAuthRequest request) {
        UserLoginResponse userLoginResponse = authService.loginUser(request.username(), request.password());
        return Response.success(userLoginResponse, null);
    }

    @GetMapping("/current")
    @SaCheckRole("USER")
    public ResponseEntity<Response> current() {
        return Response.success(authService.getCurrentUser(), null);
    }
}
