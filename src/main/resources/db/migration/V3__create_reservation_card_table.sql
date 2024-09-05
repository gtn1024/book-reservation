CREATE TABLE reservation_cards
(
    id          UUID                        NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id     UUID                        NOT NULL,
    card_number VARCHAR(255)                NOT NULL,
    CONSTRAINT pk_reservation_cards PRIMARY KEY (id)
);

ALTER TABLE reservation_cards
    ADD CONSTRAINT uc_reservation_cards_card_number UNIQUE (card_number);

ALTER TABLE reservation_cards
    ADD CONSTRAINT uc_reservation_cards_user UNIQUE (user_id);

ALTER TABLE reservation_cards
    ADD CONSTRAINT FK_RESERVATION_CARDS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);