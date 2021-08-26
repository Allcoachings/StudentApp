package com.allcoaching.AllCoachingRestApi.dto;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SavePushTokenDto {

    private long id;
    private String mode;
    private String expoToken;
}
