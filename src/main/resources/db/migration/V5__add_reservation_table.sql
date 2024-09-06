CREATE TABLE reservations
(
    id         UUID                        NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    book_id    UUID                        NOT NULL,
    user_id    UUID                        NOT NULL,
    start_date date                        NOT NULL,
    end_date   date                        NOT NULL,
    CONSTRAINT pk_reservations PRIMARY KEY (id)
);

ALTER TABLE reservations
    ADD CONSTRAINT FK_RESERVATIONS_ON_BOOK FOREIGN KEY (book_id) REFERENCES books (id);

ALTER TABLE reservations
    ADD CONSTRAINT FK_RESERVATIONS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);