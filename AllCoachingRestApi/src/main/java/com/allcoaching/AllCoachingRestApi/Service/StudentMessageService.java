package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.StudentMessage;
import com.allcoaching.AllCoachingRestApi.Respository.StudentMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class StudentMessageService {


    @Autowired
     private StudentMessageRepo studentMessageRepo;


    public StudentMessage addStudentMessage(StudentMessage studentMessage)
    {
        return studentMessageRepo.save(studentMessage);
    }

    public Iterable<StudentMessage>  getStudentMessagesWithMessageType(boolean forAdmin,String messageType,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByForAdminAndMessageType(forAdmin,messageType, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }
    public Iterable<StudentMessage>  getStudentMessages(boolean forAdmin,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByForAdmin(forAdmin, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }

    public void updateMessageSeenStatus(long messageId,boolean status)
    {
        studentMessageRepo.updateMessageSeenStatus(messageId,status);
    }


    public long getStudentMessageUnseenCount(boolean forAdmin)
    {
        return  studentMessageRepo.countByForAdminAndIsSeenByAdmin(forAdmin,false);
    }


}

