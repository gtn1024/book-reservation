package com.github.gtn1024.bookreservation.controller;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import cn.dev33.satoken.exception.SaTokenException;
import com.github.gtn1024.bookreservation.exception.AppException;
import com.github.gtn1024.bookreservation.exception.NotFoundException;
import com.github.gtn1024.bookreservation.model.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestControllerExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(RestControllerExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response> handleIllegalArgumentException(IllegalArgumentException e) {
        logger.error(e.getMessage(), e);
        return Response.fail(e.getMessage() != null ? e.getMessage() : "Illegal Argument", 400);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Response> handleNotFoundException(NotFoundException e) {
        logger.error(e.getMessage(), e);
        return Response.fail("Not found", 404);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<Response> handleAppException(AppException e) {
        logger.error(e.getMessage(), e);
        return Response.fail(e.getMessage(), e.getCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        logger.error(e.getMessage(), e);
        var msg = e.getFieldErrors().getFirst().getDefaultMessage() + ": " + e.getFieldErrors().getFirst().getField();
        return Response.fail(msg, 400);
    }

    @ExceptionHandler(SaTokenException.class)
    public ResponseEntity<Response> handleSaTokenException(SaTokenException e) {
        logger.error(e.getMessage(), e);

        return switch (e) {
            case NotLoginException ignored -> Response.fail("未登录", 401);
            case NotPermissionException ignored -> Response.fail("无权限", 403);
            case NotRoleException ignored -> Response.fail("无权限", 403);
            default -> Response.fail(e.getMessage() != null ? e.getMessage() : "Unauthorized", 400);
        };

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleException(Exception e) {
        logger.error(e.getMessage(), e);
        return Response.fail(e.getMessage() != null ? e.getMessage() : "Internal Server Error", 500);
    }
}
