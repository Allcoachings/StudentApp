package com.allcoaching.restApi;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundExecton extends RuntimeException {
    public UserNotFoundExecton(String s) {
        super(s);
    }
}
