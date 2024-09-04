package com.github.gtn1024.bookreservation.repository;

import com.github.gtn1024.bookreservation.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
}
