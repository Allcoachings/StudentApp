package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDataDto {

    private String data;
    private  String url;
    private String body;
    private  String title;
    private String[] expoTokens;
    private String targetGroup;
    private String targetGroupType;
}
