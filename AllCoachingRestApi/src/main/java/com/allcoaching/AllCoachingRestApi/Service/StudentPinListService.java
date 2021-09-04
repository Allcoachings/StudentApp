package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Entity.StudentPinList;
import com.allcoaching.AllCoachingRestApi.Respository.StudentPinListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class StudentPinListService {

    @Autowired
    private StudentPinListRepo studentPinListRepo;



    public StudentPinList save(StudentPinList studentPinList)
    {
        return  studentPinListRepo.save(studentPinList);
    }

    public Optional<StudentPinList> findById(long id)
    {
        return studentPinListRepo.findById(id);
    }

    public  Iterable<StudentPinList> findAllByStudentId(Student student, int page, int pageSize)
    {
        Page<StudentPinList> paged_result = studentPinListRepo.findByStudent(student, PageRequest.of(page,pageSize));
        if(paged_result.hasContent())
        {
            return paged_result.getContent();
        }

        return new ArrayList<>();
    }


    public  void  deleteById(long id)
    {
        studentPinListRepo.deleteById(id);
    }

    public Optional<StudentPinList> checkPin(Student student, Institute institute)
    {
        return studentPinListRepo.findByStudentAndInstitute(student,institute);
    }
}
