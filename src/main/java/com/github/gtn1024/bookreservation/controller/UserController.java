package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.github.gtn1024.bookreservation.entity.ReservationCard;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.service.ReservationCardService;
import com.github.gtn1024.bookreservation.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    private final ReservationCardService reservationCardService;
    private final UserService userService;

    public UserController(ReservationCardService reservationCardService, UserService userService) {
        this.reservationCardService = reservationCardService;
        this.userService = userService;
    }

    @GetMapping("getCard")
    @SaCheckRole("USER")
    public ResponseEntity<Response> getCard() {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        ReservationCard reservationCard = reservationCardService.createReservationCard(userId);

        return Response.success(reservationCard.getCardNumber(), null);
    }

    @GetMapping("myCard")
    @SaCheckRole("USER")
    public ResponseEntity<Response> myCard() {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        User user = userService.getUserById(userId);
        ReservationCard reservationCard = reservationCardService.getReservationCardByUser(user);
        if (reservationCard == null) {
            return Response.success(null, null);
        }

        return Response.success(reservationCard.getCardNumber(), null);
    }
}
