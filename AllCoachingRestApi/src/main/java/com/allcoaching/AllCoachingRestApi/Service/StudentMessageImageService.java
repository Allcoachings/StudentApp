package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.StudentMessageImages;
import com.allcoaching.AllCoachingRestApi.Respository.StudentMessageImagesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentMessageImageService {


    @Autowired
    private StudentMessageImagesRepo studentMessageImagesRepo;


    public void addStudentMessageImagesList (ArrayList<StudentMessageImages> studentMessageImages)
    {
        Iterable<StudentMessageImages>  studentMessageImages_saved = studentMessageImagesRepo.saveAll(studentMessageImages);


    }
}
