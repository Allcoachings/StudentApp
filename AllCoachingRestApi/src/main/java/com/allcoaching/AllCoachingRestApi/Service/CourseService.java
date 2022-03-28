package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Lazy
    @Autowired
    private NotificationService notificationService;
    //saving course to repo
    public Course save(Course course)
    {
        return courseRepo.save(course);
    }

    //fetching course by institute id
    public  Iterable<Course> findByInstId(long instId,boolean isDeleted)
    {
        return courseRepo.findByInstIdAndIsDeletedOrderByCreatedAtDesc(instId,isDeleted);
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
    public List<InstituteCourseWiseStudentEnrolledDto> getStudentEnrolledInCourse(long courseId)
    {
        return courseRepo.getStudentEnrolledInCourse(courseId);
    }
    List<String> getStudentsExpoTokenEnrolledInCourse(long courseId)
    {
        return  courseRepo.getExpoTokenOfStudentsEnrolledInCourse(courseId);
    }

    public List<Long> getCourseEnrolledStudent(long courseId)
    {
        return  courseRepo.getCourseEnrolledStudent(courseId);
    }


    public Iterable<Notification> sendNotificationToEnrolledStudents(long courseId, String message)
    {
        Institute institute = getInstituteByCourseId(courseId);
        Course course = findById(courseId).get();
        return notificationService.insertNotification(getCourseEnrolledStudent(courseId),institute.getName()+" add a new "+message+" in course "+course.getTitle(),institute.getId(),"institute","course",institute,courseId);
    }
    @Async
     public CompletableFuture<Iterable<Notification>> sendNotificationAsync(long courseId,String message)
     {
         return CompletableFuture.completedFuture(sendNotificationToEnrolledStudents(courseId,message));
     }

    public Institute getInstituteByCourseId(long courseId)
    {
        return courseRepo.findInstitueByCourseid(courseId);
    }




}
