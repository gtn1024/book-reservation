package com.github.gtn1024.bookreservation.entity;

import com.github.gtn1024.bookreservation.util.ISBNUtil;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "books")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Book extends BaseEntity {
    @Column(nullable = false)
    private String isbn;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String publisher;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer quantity;

    private String cover;

    @Override
    protected void prePersist() {
        super.prePersist();
        checkISBN(this.isbn);
    }

    @Override
    protected void preUpdate() {
        super.preUpdate();
        checkISBN(this.isbn);
    }

    private void checkISBN(String isbn) {
        if (!ISBNUtil.isISBN13Valid(isbn)) {
            throw new IllegalArgumentException("Invalid ISBN");
        }
    }
}
