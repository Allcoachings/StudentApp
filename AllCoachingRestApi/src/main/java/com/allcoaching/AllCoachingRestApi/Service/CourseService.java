package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public void deleteCourseById(long id)
    {
          courseRepo.deleteById(id);
    }

    //fetch course bu its id
    public Optional<Course> findById(long id)
    {
        return courseRepo.findById(id);
    }

    public long countCoursesOf(long institute)
    {
        return courseRepo.countByInstId(institute);
    }
}
