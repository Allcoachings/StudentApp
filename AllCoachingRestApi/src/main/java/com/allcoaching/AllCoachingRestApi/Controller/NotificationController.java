package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Service.NotificationService;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDataDto;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/notification")
@Api()
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

    @CrossOrigin(origins = "*")
    @GetMapping("/{receiverId}/{receiverType}/{type}/{page}/{pageSize}")
    public Iterable<NotificationDto>  getNotificationByType(@PathVariable long receiverId,@PathVariable int receiverType,@PathVariable String type,@PathVariable int page,@PathVariable int pageSize)
    {
        return  notificationService.getNotificationForByType(receiverType,type,receiverId,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/send/notification")
    public ResponseEntity<Object>  sendNotification(@RequestBody NotificationDataDto notificationDataDto)
    {

        try {
           String result =  notificationService.sendNotification(notificationDataDto);
           if(result.equals("OK"))
           {
               return  ResponseEntity.ok().build();
           }
        }catch (Exception e)
        {
            e.printStackTrace();
            return  ResponseEntity.badRequest().build();
        }


        return  ResponseEntity.badRequest().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/update/notificationSeenStatus/{isSeen}/{id}")
    public ResponseEntity<Object>  updateNotificationSeenStatus(@PathVariable boolean isSeen,@PathVariable long id)
    {
          notificationService.updateNotificationSeenStatus(isSeen,id);

          return  ResponseEntity.ok().build();
    }
}
