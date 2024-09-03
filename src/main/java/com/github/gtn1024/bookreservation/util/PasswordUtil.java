package com.github.gtn1024.bookreservation.util;

import cn.hutool.core.util.RandomUtil;
import org.apache.commons.codec.digest.DigestUtils;

public class PasswordUtil {
    public static String getSalt() {
        return RandomUtil.randomString(32);
    }

    public static String hashPassword(String password, String salt) {
        return DigestUtils.sha256Hex(password + salt);
    }

    public static boolean checkPassword(String password, String salt, String hash) {
        return hashPassword(password, salt).equals(hash);
    }
}
