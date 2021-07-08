package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    //saving course to repo
    public Course save(Course course)
    {
        return courseRepo.save(course);
    }

    //fetching course by institute id
    public  Iterable<Course> findByInstId(long instId)
    {
        return courseRepo.findByInstId(instId);
    }
}
