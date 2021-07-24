package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public Student createStudent(Student student)
    {
        return studentRepo.save(student);
    }

    public Optional<Student> findById(long id)
    {
        return studentRepo.findById(id);
    }

    public Optional<Student> findByMobileNumber(String mobileNumber)
    {
        return  studentRepo.findByMobileNumber(mobileNumber);
    }


    public Iterable<Student> findAll(int page,int pageSize)
    {
        Page<Student> pagedResult = studentRepo.findAll(PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
                return pagedResult.getContent();
        }else
        {
            return new ArrayList<Student>();
        }


    }



}
