package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
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


    public void deleteById(long id)
    {
        studentMessageRepo.deleteById(id);
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
    public Iterable<StudentMessage>  getStudentMessagesWithMessageTypeByStudent(boolean forAdmin,String messageType,Student s,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByForAdminAndMessageTypeAndStudent(forAdmin,messageType, s,PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }
    public Iterable<StudentMessage>  getStudentMessagesWithMessageTypeForIns(Institute institute,boolean forAdmin,String messageType,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByInstituteAndForAdminAndMessageType(institute,forAdmin,messageType, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }

    //fetching list of students who have sent messages to institue
    public Iterable<StudentMessage> getChatListForInstitute(Institute institute, long courseId, int page, int pageSize)
    {
        Page<StudentMessage> pagedResult =  studentMessageRepo.getChatListForInstitute(institute,courseId,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"messageInitialTime")));
        if(pagedResult.hasContent())
        {
                return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    //fetching list of student Messages sent  for a course of institute
    public Iterable<StudentMessage> findByInstituteAndCourseIdAndStudentOrderByMessageInitialTime(Institute institute, Student s, long courseId, int page, int pageSize)
    {
        Page<StudentMessage> pagedResult =  studentMessageRepo.findByInstituteAndCourseIdAndStudentOrderByMessageInitialTime(institute,courseId,s,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"messageInitialTime")));
        if(pagedResult.hasContent())
        {
                return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }
    public Iterable<StudentMessage>  getStudentMessagesWithMessageTypeAndRepliedForIns(Institute institute,boolean replied, boolean forAdmin,String messageType,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByInstituteAndForAdminAndMessageTypeAndReplied(institute,forAdmin,messageType,replied, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }
    public Iterable<StudentMessage>  getStudentMessagesForIns(Institute institute,boolean forAdmin,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByInstituteAndForAdmin(institute,forAdmin, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }
    public Iterable<StudentMessage>  getStudentMessagesRepliedForIns(Institute i,boolean replied,boolean forAdmin,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByInstituteAndForAdminAndReplied(i,forAdmin,replied, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
           if(pagedResult.hasContent())
           {
               return pagedResult.getContent();
           }
           return new ArrayList<>();
    }

    public Iterable<StudentMessage>  getStudentMessagesWithMessageTypeAndReplied(boolean replied, boolean forAdmin,String messageType,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByForAdminAndMessageTypeAndReplied(forAdmin,messageType,replied, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
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
    public Iterable<StudentMessage>  getStudentMessagesReplied(boolean replied,boolean forAdmin,int page,int pageSize)
    {
           Page<StudentMessage> pagedResult =  studentMessageRepo.findByForAdminAndReplied(forAdmin,replied, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"messageInitialTime")));
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

    public void updateMessageSeenStatusForIns(long messageId,boolean status)
    {
        studentMessageRepo.updateMessageSeenByInsStatus(messageId,status);
    }


    public long getStudentMessageUnseenCountForIns(long insId)
    {
        Institute institute = new Institute(insId);
        return  studentMessageRepo.countByInstituteAndIsSeenByIns(institute,false);
    }


}

