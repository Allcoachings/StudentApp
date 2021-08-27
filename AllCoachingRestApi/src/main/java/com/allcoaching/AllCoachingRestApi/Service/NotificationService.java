package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.NotificationRepo;
import com.allcoaching.AllCoachingRestApi.Utils.Admin.AdminConfig;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDto;
import com.allcoaching.AllCoachingRestApi.dto.NotificationSenderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private InstituteService instituteService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdminConfig adminConfig;

    //add notification to db
    public Notification saveNotification(Notification notification)
    {
        return notificationRepo.save(notification);
    }

    //get notification by notificationFor param
    public Iterable<NotificationDto> getNotificationFor(int notificationFor,long receiverId, int page, int pageSize)
    {
              Page<Notification> paged_result =  notificationRepo.findByNotificationForAndReceiverIdOrderByNotificationTimeDesc(notificationFor,receiverId, PageRequest.of(page,pageSize));
              if(paged_result.hasContent())
              {
                  Iterable<Notification> notifications = paged_result.getContent();
                  List<NotificationDto> notificationDtos = new ArrayList<>();
                  notifications.forEach(item->{
                      NotificationSenderDto senderDto = null;
                      switch (item.getNotificationFrom())
                      {
                          case "admin":
                                    senderDto = new NotificationSenderDto(adminConfig.getId(),adminConfig.getName(),adminConfig.getImage());
                              break;
                          case "institute":
                              Optional<Institute> instituteObj = instituteService.findById(item.getSenderId());
                              if(instituteObj.isPresent())
                              {
                                  Institute institute = instituteObj.get();
                                  senderDto = new NotificationSenderDto(institute.getId(), institute.getName(), institute.getLogo());
                              }
                              break;
                          case "student":

                              Optional<Student> studentObj = studentService.findById(item.getSenderId());
                              if(studentObj.isPresent())
                              {
                                  Student student = studentObj.get();
                                  senderDto = new NotificationSenderDto(student.getId(), student.getName(), student.getStudentImage());
                              }
                              break;
                      }
                      notificationDtos.add(new NotificationDto(item,senderDto));
                  });
                  return  notificationDtos;

              }
              return new ArrayList<>();
    }





}
