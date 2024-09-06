package com.github.gtn1024.bookreservation.controller;

import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RootController {
    private final BookService bookService;

    public RootController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("newBooks")
    public ResponseEntity<Response> newBooks() {
        return Response.success(bookService.homepageGetNewBooks(), null);
    }
}
