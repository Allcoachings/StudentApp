package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Respository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;
    @Autowired
    private InstituteService instituteService;
    @Autowired
    private StudentService studentService;


    //add notification to db
    public Notification saveNotification(Notification notification)
    {
        return notificationRepo.save(notification);
    }

    //get notification by any
}
