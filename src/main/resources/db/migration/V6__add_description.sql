ALTER TABLE books
    ADD description TEXT DEFAULT '';

ALTER TABLE books
    ALTER COLUMN description SET NOT NULL;