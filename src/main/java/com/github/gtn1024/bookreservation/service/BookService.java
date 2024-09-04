package com.github.gtn1024.bookreservation.service;

import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.exception.NotFoundException;
import com.github.gtn1024.bookreservation.repository.BookRepository;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks(String title, String author, String publisher, Integer year, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        return bookRepository.findByTitleLikeAndAuthorLikeAndPublisherLikeAndYear(title, author, publisher, year, pageRequest);
    }

    public Integer countBooks(String title, String author, String publisher, Integer year) {
        return bookRepository.countByTitleLikeAndAuthorLikeAndPublisherLikeAndYear(title, author, publisher, year);
    }

    public Book getBookById(UUID id) {
        return bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeBook(UUID id) {
        if (!bookRepository.existsById(id)) {
            throw new NotFoundException("Book not found");
        }
        bookRepository.deleteById(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(String isbn, String title, String author, String publisher, Integer year, Integer quantity) {
        Book book = new Book();
        book.setIsbn(isbn);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setYear(year);
        book.setQuantity(quantity);
        bookRepository.save(book);
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(UUID id, @NotBlank String isbn, @NotBlank String title, @NotBlank String author, @NotBlank String publisher, @NotNull Integer year, @NotNull @Min(0) Integer quantity) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));
        book.setIsbn(isbn);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setYear(year);
        book.setQuantity(quantity);
        bookRepository.save(book);
    }
}
