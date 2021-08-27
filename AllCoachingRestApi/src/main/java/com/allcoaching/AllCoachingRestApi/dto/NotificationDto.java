package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Optional;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private Notification notification;
    private NotificationSenderDto senderObject;


}
