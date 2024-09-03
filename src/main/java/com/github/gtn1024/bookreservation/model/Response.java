package com.github.gtn1024.bookreservation.model;

import org.springframework.http.ResponseEntity;

public record Response(
        String error,
        Object data,
        Pagination pagination
) {
    public static ResponseEntity<Response> success(Object data, Pagination pagination) {
        return ResponseEntity.status(200).body(new Response(null, data, pagination));
    }

    public static ResponseEntity<Response> fail(String error, int code) {
        return ResponseEntity.status(code).body(new Response(error, null, null));
    }

    public static ResponseEntity<Response> notFound() {
        return fail("Not found", 404);
    }

    public static ResponseEntity<Response> internalError(String error) {
        return fail(error, 500);
    }
}
