package com.github.gtn1024.bookreservation.service;

import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.entity.Reservation;
import com.github.gtn1024.bookreservation.entity.ReservationCard;
import com.github.gtn1024.bookreservation.entity.User;
import com.github.gtn1024.bookreservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BookService bookService;
    private final ReservationCardService reservationCardService;
    private final UserService userService;

    public ReservationService(ReservationRepository reservationRepository, BookService bookService, ReservationCardService reservationCardService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.bookService = bookService;
        this.reservationCardService = reservationCardService;
        this.userService = userService;
    }

    @Transactional(rollbackFor = Exception.class)
    public void reserveBook(UUID userId, String cardNumber, UUID bookId, LocalDate startDate, LocalDate endDate) {
        // 1. 校验 start date 和 end date
        LocalDate now = LocalDate.now();
        if (startDate.isBefore(now) || endDate.isBefore(now) || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("日期错误");
        }

        // 2. 校验用户是否存在
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }

        // 3. 检查卡号是否正确
        ReservationCard reservationCard = reservationCardService.getReservationCardByUser(user);
        if (reservationCard == null || !reservationCard.getCardNumber().equals(cardNumber)) {
            throw new IllegalArgumentException("卡号错误");
        }

        // 4. 检查书籍是否存在
        Book book = bookService.getBookById(bookId);
        if (book == null) {
            throw new IllegalArgumentException("书籍不存在");
        }

        // 5. 检查今天是否已经预约过
        reservationRepository.findByUserAndBookAndCreatedAtAfter(user, book, LocalDate.now().atStartOfDay())
                .ifPresent(reservation -> {
                    throw new IllegalArgumentException("已经预约过这本书了");
                });

        // 6. 判断剩余册数是否足够
        if (bookService.getBookAvailableQuantity(book) <= 0) {
            throw new IllegalArgumentException("剩余册数不足");
        }

        // 7. 入库
        Reservation reservation = new Reservation(book, user, startDate, endDate);
        reservationRepository.save(reservation);
    }
}
