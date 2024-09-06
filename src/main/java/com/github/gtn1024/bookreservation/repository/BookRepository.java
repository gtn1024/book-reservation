package com.github.gtn1024.bookreservation.repository;

import com.github.gtn1024.bookreservation.entity.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID>, JpaSpecificationExecutor<Book> {
    Integer countByTitleLikeAndAuthorLikeAndPublisherLikeAndYear(String title, String author, String publisher, Integer year);


}
