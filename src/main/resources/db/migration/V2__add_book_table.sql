CREATE TABLE books
(
    id         UUID         NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    isbn       VARCHAR(255) NOT NULL,
    title      VARCHAR(255) NOT NULL,
    author     VARCHAR(255) NOT NULL,
    publisher  VARCHAR(255) NOT NULL,
    year       INTEGER      NOT NULL,
    quantity   INTEGER      NOT NULL,
    CONSTRAINT pk_books PRIMARY KEY (id)
);