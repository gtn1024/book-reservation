package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.github.gtn1024.bookreservation.entity.Reservation;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.model.Pagination;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.model.request.BookReserveRequest;
import com.github.gtn1024.bookreservation.service.ReservationService;
import com.github.gtn1024.bookreservation.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    private final UserService userService;

    public ReservationController(ReservationService reservationService, UserService userService) {
        this.reservationService = reservationService;
        this.userService = userService;
    }

    @GetMapping
    @SaCheckRole("USER")
    public ResponseEntity<Response> view(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer size
    ) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        Page<Reservation> reservations = reservationService.getReservationsByUser(userId, page, size);
        Pagination pagination = new Pagination(page, size, reservations.getTotalElements(), reservations.getTotalPages());

        return Response.success(reservations.getContent(), pagination);
    }

    @GetMapping("{id}")
    @SaCheckRole("USER")
    public ResponseEntity<Response> show(@PathVariable UUID id) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        Reservation reservation = reservationService.getReservationById(userId, id);

        return Response.success(reservation, null);
    }

    @PostMapping("reserve")
    @SaCheckRole("USER")
    public ResponseEntity<Response> reserve(@RequestBody BookReserveRequest request) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        reservationService.reserveBook(userId, request.cardNumber(), request.bookId(), request.startDate(), request.endDate());

        return Response.success(null, null);
    }

    @GetMapping("{id}/canReserve")
    @SaCheckRole("USER")
    public ResponseEntity<Response> canReserve(@PathVariable UUID id) {
        UUID userId = UUID.fromString(StpUtil.getLoginIdAsString());
        boolean canReserve = reservationService.canReserveBook(userId, id);

        return Response.success(canReserve, null);
    }
}
