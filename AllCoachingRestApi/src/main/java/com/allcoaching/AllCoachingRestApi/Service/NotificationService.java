package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.NotificationRepo;
import com.allcoaching.AllCoachingRestApi.Utils.Admin.AdminConfig;
import com.allcoaching.AllCoachingRestApi.Utils.Expo.ExpoNotification;
import com.allcoaching.AllCoachingRestApi.Utils.Expo.ExpoNotificationData;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDataDto;
import com.allcoaching.AllCoachingRestApi.dto.NotificationDto;
import com.allcoaching.AllCoachingRestApi.dto.NotificationSenderDto;
import io.github.jav.exposerversdk.PushClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {





    @Autowired
    private CourseService courseService;
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

    //get notification filtered by type
    //get notification by notificationFor param
    public Iterable<NotificationDto> getNotificationForByType(int notificationFor,String type,long receiverId, int page, int pageSize)
    {
        Page<Notification> paged_result =  notificationRepo.findByNotificationForAndReceiverIdAndTypeOrderByNotificationTimeDesc(notificationFor,receiverId, type,PageRequest.of(page,pageSize));
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


    public  String sendNotification(NotificationDataDto notificationDataDto) throws PushClientException
    {

            String targetGroup = notificationDataDto.getTargetGroup();
            String targetGroupType = notificationDataDto.getTargetGroupType();
            String targetEmail = notificationDataDto.getTargetEmail();
            List<String> expoTokens = null;
            ExpoNotificationData expoNotificationData = new ExpoNotificationData();
            expoNotificationData.setTitle(notificationDataDto.getTitle());
            expoNotificationData.setBody(notificationDataDto.getBody());
            Map<String,Object> notificationData = new HashMap<>();

            notificationData.putIfAbsent("url",notificationDataDto.getUrl());
            //any other data to be sent ot the users
            notificationData.putIfAbsent("data",notificationDataDto.getData());

            expoNotificationData.setData(notificationData);

            switch (targetGroupType)
            {
                case "studentsEnrolledInCategory":
                    expoTokens = getExpoTokenForStudentsEnrolledInCategory(Long.parseLong(targetGroup));
//                    insertNotification(expoTokens,notificationDataDto.getTitle(),notificationDataDto.getBody())
                    break;
                case "allUsers":
                    expoTokens = getExpoTokenForAllStudent(0,1000);
                    break;
                case "allInstitutes":
                    expoTokens = getExpoTokenForAllIns(0,1000);
                    break;
                case "institutesOfCategory":
                    expoTokens = getExpoTokenForInsEnrolledInCategory(Long.parseLong(targetGroup));
                    break;
                case "singleUser":
                    expoTokens = getExpoTokenForStudent(Long.parseLong(targetGroup),targetEmail);
                    break;
                case "singleInstitute":
                    expoTokens = getExpoTokenForIns(Long.parseLong(targetGroup),targetEmail);
                    break;
                case "courseStudents":
                    expoTokens = getExpoTokenForStudentsEnrolledInCourse(Long.parseLong(targetGroup));
                    break;
            }
            expoNotificationData.getTo().addAll(expoTokens);

            return ExpoNotification.sendNotification(expoNotificationData);
    }

    public void updateNotificationSeenStatus(boolean isSeen,long id)
    {
        notificationRepo.updateNotificationStatus(isSeen,id);
    }


    public Iterable<Notification> insertNotification(List<Long> studentIds,String text,long senderId,String notificationFrom,String notificationType,Institute senderDetails,long courseId) {
        List<Notification> notificationList = new ArrayList<>();
        studentIds.forEach(studentId->{
            Notification notification = new Notification();
            notification.setSenderId(senderId);
            notification.setReceiverId(studentId);
            notification.setNotificationFrom(notificationFrom);
            notification.setMessage(text);
            notification.setNotificationFor(2);//student
            notification.setType(notificationType);
            notification.setNotificationImage( senderDetails.getLogo());

           notificationList.add(notification);
        });
         NotificationDataDto notificationDto= new NotificationDataDto();
         notificationDto.setBody(text);
         notificationDto.setTitle("Notification");
         notificationDto.setTargetGroup(String.valueOf(courseId));
         notificationDto.setTargetGroupType("courseStudents");


        try {
            sendNotification(notificationDto);
        } catch (PushClientException exception) {
            exception.printStackTrace();
        }
        return notificationRepo.saveAll(notificationList);
    }

    private List<String> getExpoTokenForStudentsEnrolledInCategory(long category)
    {
        return studentService.getExpoTokenOfStudentsEnrolledInCategory(category);
    }

    private List<String> getExpoTokenForStudent(long id,String email)
    {

        ArrayList<String> tokens = new ArrayList<String>();
        tokens.add(studentService.getExpoTokenOfStudent(id,email));
        return tokens;
    }
    private List<String> getExpoTokenForAllStudent(int page,int pageSize)
    {
        Page<String> pagedResult  = studentService.getExpoTokenOfAllStudents(page,pageSize);;
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }




    private List<String> getExpoTokenForStudentsEnrolledInCourse(long courseId)
    {
        return courseService.getStudentsExpoTokenEnrolledInCourse(courseId);
    }
    private List<String> getExpoTokenForInsEnrolledInCategory(long category)
    {
        return instituteService.getExpoTokenOfInsEnrolledInCategory(category);
    }

    private List<String> getExpoTokenForIns(long id,String email)
    {

        ArrayList<String> tokens = new ArrayList<String>();
        tokens.add(instituteService.getExpoTokenOfIns(id,email));
        return tokens;
    }
    private List<String> getExpoTokenForAllIns(int page,int pageSize)
    {
        Page<String> pagedResult  = instituteService.getExpoTokenOfAllIns(page,pageSize);
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }



}