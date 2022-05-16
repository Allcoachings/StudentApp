package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseService;
import com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute")
@Api()
public class CourseController {

    @Autowired
    private CourseService courseService;

    @CrossOrigin(origins = "*")
    @GetMapping("/{insId}/course")
    public  Iterable<Course> findAllCourse(@PathVariable long insId,@RequestParam boolean isDeleted)
    {
        return courseService.findByInstId(insId,isDeleted);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/course/")
    public ResponseEntity<Object> AddCourse(@RequestBody Course course)
    {
        Course c = courseService.save(course);
        URI location = ServletUriComponentsBuilder
                        .fromPath("{id}")
                        .buildAndExpand(c.getId())
                        .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");

        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCourseById(@PathVariable long id,@RequestParam(name = "deleteCourse")boolean deleteCourse)
    {
        courseService.deleteCourseById(id,deleteCourse);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/deleteCoursePermanently/{id}")
    public ResponseEntity<Object> deleteCoursePermanentlyById(@PathVariable long id)
    {
        courseService.deleteCoursePermanentlyById(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("countcourse/{insId}")
    public long countCoursesOf(@PathVariable long insId)
    {
        return  courseService.countCoursesOf(insId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("countStudentEnrolledInCourse/{courseId}")
    public long countStudentEnrolledIn(@PathVariable long courseId)
    {
        return  courseService.countStudentEnrolledInCourse(courseId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getInstituteCourseWiseStudentEnrolled/{insId}")
    public List<InstituteCourseWiseStudentEnrolledDto> getInstituteCourseWiseStudentEnrolled(@PathVariable long insId)
    {
        return  courseService.getInstituteCourseWiseStudentEnrolled(insId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentEnrolledInCourse/{courseId}")
    public List<InstituteCourseWiseStudentEnrolledDto> getStudentEnrolledInCourse(@PathVariable long courseId)
    {
        return  courseService.getStudentEnrolledInCourse(courseId);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("coursebyId/{courseId}")
    public Optional<Course> findById(@PathVariable long courseId)
    {
        return  courseService.findById(courseId);
    }

}
