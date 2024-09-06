package com.github.gtn1024.bookreservation.service;

import com.github.gtn1024.bookreservation.entity.Book;
import com.github.gtn1024.bookreservation.exception.NotFoundException;
import com.github.gtn1024.bookreservation.repository.BookRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Page<Book> getBooks(String title, String author, String publisher, Integer year, Integer page, Integer size) {
        Specification<Book> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (title != null && !title.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + title + "%"));
            }
            if (author != null && !author.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("author"), "%" + author + "%"));
            }
            if (publisher != null && !publisher.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("publisher"), "%" + publisher + "%"));
            }
            if (year != null) {
                predicates.add(criteriaBuilder.equal(root.get("year"), year));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Sort sort = Sort.by(Sort.Order.asc("createdAt"));
        PageRequest pageRequest = PageRequest.of(page - 1, size, sort);
        return bookRepository.findAll(spec, pageRequest);
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
    public void create(
            String isbn,
            String title,
            String author,
            String publisher,
            Integer year,
            Integer quantity,
            String description,
            String cover
    ) {
        Book book = new Book();
        book.setIsbn(isbn);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setYear(year);
        book.setQuantity(quantity);
        book.setDescription(description);
        book.setCover(cover);
        bookRepository.save(book);
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(
            UUID id,
            String isbn,
            String title,
            String author,
            String publisher,
            Integer year,
            Integer quantity,
            String description,
            String cover
    ) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book not found"));
        book.setIsbn(isbn);
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublisher(publisher);
        book.setYear(year);
        book.setQuantity(quantity);
        book.setDescription(description);
        book.setCover(cover);
        bookRepository.save(book);
    }

    public Integer getBookAvailableQuantity(Book book) {
        return 0;
    }
}
