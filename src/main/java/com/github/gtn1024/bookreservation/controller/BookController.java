package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.model.Pagination;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.model.request.BookRequest;
import com.github.gtn1024.bookreservation.service.BookService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<Response> view(
            @RequestParam(required = false, defaultValue = "") String title,
            @RequestParam(required = false, defaultValue = "") String author,
            @RequestParam(required = false, defaultValue = "") String publisher,
            @RequestParam(required = false, defaultValue = "") Integer year,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer size
    ) {
        Page<Book> books = bookService.getBooks(title, author, publisher, year, page, size);
        Pagination pagination = new Pagination(page, size, books.getTotalElements(), books.getTotalPages());
        return Response.success(books.getContent(), pagination);
    }

    @GetMapping("{id}")
    public ResponseEntity<Response> show(@PathVariable UUID id) {
        Book book = bookService.getBookById(id);
        return Response.success(book, null);
    }

    @PostMapping
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> create(@Valid @RequestBody BookRequest request) {
        bookService.create(request.isbn(), request.title(), request.author(), request.publisher(), request.year(), request.quantity(), request.description(), request.cover());
        return Response.success(null, null);
    }

    @PutMapping("{id}")
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> update(@PathVariable UUID id, @Valid @RequestBody BookRequest request) {
        bookService.update(id, request.isbn(), request.title(), request.author(), request.publisher(), request.year(), request.quantity(), request.description(), request.cover());
        return Response.success(null, null);
    }

    @DeleteMapping("{id}")
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> delete(@PathVariable UUID id) {
        bookService.removeBook(id);
        return Response.success(null, null);
    }
}
