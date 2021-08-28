package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Service.NotificationService;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

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
    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> addNotification(@RequestBody Notification notification)
    {
        Notification notification_saved =   notificationService.saveNotification(notification);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(notification_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}