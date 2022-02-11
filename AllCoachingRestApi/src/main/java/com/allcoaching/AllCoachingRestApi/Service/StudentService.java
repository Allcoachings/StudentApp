package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.StudentRepo;
import com.allcoaching.AllCoachingRestApi.Utils.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;


    public  void updateProfilePic(String image,long id)
    {

        studentRepo.updateProfilePic(image, id);
    }
    public Student createStudent(Student student)
    {
       Student student_saved =  studentRepo.save(student);
        long id = student_saved.getId();
        String name = student_saved.getName();
        String randomString = RandomString.getAlphaNumericString(3);
        String uniqueId = name+"_"+randomString+""+id;
        student_saved.setUserId(uniqueId);
        return studentRepo.save(student_saved);
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

    public Iterable<Student> findAllWithStatus(boolean status,int page,int pageSize)
    {
        Page<Student> pagedResult = studentRepo.findByBlocked(status,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<Student>();
        }


    }

    public void delete(long id)
    {
        studentRepo.deleteById(id);
    }


    public  void updateBlockedStatus(boolean status, long id)
    {
        studentRepo.updateBlockedStatus(status,id);
    }


    public void updatePushToken(long id,String token)
    {
        studentRepo.updatePushToken(id,token);
    }

    public Iterable<Student> searchStudent(String word, int page, int pageLimit)
    {
        Page<Student> pagedResult = studentRepo.findByNameContainingIgnoreCase(word,PageRequest.of(page,pageLimit));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    public Iterable<Student> searchStudentByEmail(String word,int page,int pageLimit)
    {
        Page<Student> pagedResult = studentRepo.findByEmailContainingIgnoreCase(word,PageRequest.of(page,pageLimit));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }


    public List<String> getExpoTokenOfStudentsEnrolledInCategory(long categoryId)
    {
        return studentRepo.getExpoTokenOfStudentsEnrolledInCategory(categoryId);
    }

    public  String getExpoTokenOfStudent(long id,String email)
    {
        return studentRepo.getExpoTokenOfStudent(id,email);
    }

    public Page<String> getExpoTokenOfAllStudents(int page,int pageSize)
    {
        return studentRepo.getExpoTokenOfAllStudents(PageRequest.of(page,pageSize));
    }



}
