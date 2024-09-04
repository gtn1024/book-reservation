package com.github.gtn1024.bookreservation.util;

public class ISBNUtil {
    public static boolean isISBN13Valid(String isbn) {
        if (isbn.length() != 13) {
            return false;
        }
        if (!isbn.matches("[0-9]+")) {
            return false;
        }
        int sum = 0;
        for (int i = 0; i < 12; i++) {
            sum += (i % 2 == 0 ? 1 : 3) * (isbn.charAt(i) - '0');
        }
        int check = (10 - sum % 10) % 10;
        return check == isbn.charAt(12) - '0';
    }
}
