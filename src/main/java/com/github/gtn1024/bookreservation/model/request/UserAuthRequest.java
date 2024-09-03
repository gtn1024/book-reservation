package com.github.gtn1024.bookreservation.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UserAuthRequest(
        @NotEmpty(message = "用户名不能为空")
        String username,

        @NotEmpty(message = "密码不能为空")
        @Size(min = 6, message = "密码长度不能小于6")
        String password
) {
}
