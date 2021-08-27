package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NotificationSenderDto {

    private long id;
    private String name;
    private String image;
}
