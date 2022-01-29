package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.StudentMessage;
import com.allcoaching.AllCoachingRestApi.Respository.StudentMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentMessageService {


    @Autowired
     private StudentMessageRepo studentMessageRepo;


    public StudentMessage addStudentMessage(StudentMessage studentMessage)
    {
        return studentMessageRepo.save(studentMessage);
    }


}

