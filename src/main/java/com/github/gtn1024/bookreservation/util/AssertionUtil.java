package com.github.gtn1024.bookreservation.util;

public class AssertionUtil {
    public static void require(boolean condition, String message) {
        if (!condition) {
            throw new IllegalArgumentException(message);
        }
    }
}
