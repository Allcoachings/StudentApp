package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public  Iterable<Course> findByInstId(long instId,boolean isDeleted)
    {
        return courseRepo.findByInstIdAndIsDeleted(instId,isDeleted);
    }

    public void deleteCourseById(long id,boolean deleteCourse)
    {
          courseRepo.updateCourseIsDeletedStatus(id,deleteCourse );
    }

    //fetch course bu its id
    public Optional<Course> findById(long id)
    {
        return courseRepo.findById(id);
    }

    public long countCoursesOf(long institute)
    {
        return courseRepo.countByInstIdAndIsDeleted(institute,false);
    }

    public long countStudentEnrolledInCourse(long courseId)
    {
        return courseRepo.countStudentsEnrolled(courseId);
    }

    public List<InstituteCourseWiseStudentEnrolledDto> getInstituteCourseWiseStudentEnrolled(long insId)
    {
        return courseRepo.getInstituteCourseWiseStudentEnrolled(insId);
    }
    List<String> getStudentsExpoTokenEnrolledInCourse(long courseId)
    {
        return  courseRepo.getExpoTokenOfStudentsEnrolledInCourse(courseId);
    }
}
