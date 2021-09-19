package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute")
@Api()
public class CourseController {

    @Autowired
    private CourseService courseService;

    @CrossOrigin(origins = "*")
    @GetMapping("/{insId}/course")
    public  Iterable<Course> findAllCourse(@PathVariable long insId)
    {
        return courseService.findByInstId(insId);
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
    public ResponseEntity<Object> deleteCourseById(@PathVariable long id)
    {
        courseService.deleteCourseById(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("countcourse/{insId}")
    public long countCoursesOf(@PathVariable long insId)
    {
        return  courseService.countCoursesOf(insId);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("coursebyId/{courseId}")
    public Optional<Course> findById(@PathVariable long courseId)
    {
        return  courseService.findById(courseId);
    }

}
