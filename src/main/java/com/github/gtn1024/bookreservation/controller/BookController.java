package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.model.Pagination;
import com.github.gtn1024.bookreservation.model.Response;
import com.github.gtn1024.bookreservation.model.request.BookRequest;
import com.github.gtn1024.bookreservation.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer size
    ) {
        List<Book> books = bookService.getBooks(title, author, publisher, year, page, size);
        Integer total = bookService.countBooks(title, author, publisher, year);
        Pagination pagination = new Pagination(page, size, (long) total, total % size == 0 ? total / size : total / size + 1);
        return Response.success(books, pagination);
    }

    @GetMapping("{id}")
    public ResponseEntity<Response> show(@PathVariable UUID id) {
        Book book = bookService.getBookById(id);
        return Response.success(book, null);
    }

    @PostMapping
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> create(@Valid @RequestBody BookRequest request) {
        bookService.create(request.isbn(), request.title(), request.author(), request.publisher(), request.year(), request.quantity());
        return Response.success(null, null);
    }

    @PutMapping("{id}")
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> update(@PathVariable UUID id, @Valid @RequestBody BookRequest request) {
        bookService.update(id, request.isbn(), request.title(), request.author(), request.publisher(), request.year(), request.quantity());
        return Response.success(null, null);
    }

    @DeleteMapping("{id}")
    @SaCheckRole("ADMIN")
    public ResponseEntity<Response> delete(@PathVariable UUID id) {
        bookService.removeBook(id);
        return Response.success(null, null);
    }
}
