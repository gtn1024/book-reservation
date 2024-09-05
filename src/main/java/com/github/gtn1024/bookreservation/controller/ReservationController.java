package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.model.request.BookReserveRequest;
import com.github.gtn1024.bookreservation.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    @SaCheckRole("USER")
    public ResponseEntity<Response> view() {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());

        return Response.success(null, null);
    }

    @GetMapping("{id}")
    @SaCheckRole("USER")
    public ResponseEntity<Response> show(@PathVariable UUID id) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());

        return Response.success(null, null);
    }

    @PostMapping("reserve")
    @SaCheckRole("USER")
    public ResponseEntity<Response> reserve(@RequestBody BookReserveRequest request) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        reservationService.reserveBook(userId, request.cardNumber(), request.bookId(), request.startDate(), request.endDate());

        return Response.success(null, null);
    }
}
