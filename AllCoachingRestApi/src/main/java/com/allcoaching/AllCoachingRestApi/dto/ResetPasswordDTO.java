package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDTO {

    private String password;
    private String hash1;
    private String hash2;
}
