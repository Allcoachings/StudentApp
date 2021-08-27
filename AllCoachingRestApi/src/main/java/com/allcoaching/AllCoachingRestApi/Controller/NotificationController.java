package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Service.NotificationService;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    @CrossOrigin(origins = "*")
    @GetMapping("/{receiverId}/{receiverType}/{page}/{pageSize}")
    public Iterable<NotificationDto>  getNotification(@PathVariable long receiverId,@PathVariable int receiverType,@PathVariable int page,@PathVariable int pageSize)
    {
        return  notificationService.getNotificationFor(receiverType,receiverId,page,pageSize);
    }
}
