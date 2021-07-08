package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Respository.CourseRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/institute")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/{insId}/course")
    public  Iterable<Course> findAllCourse(@PathVariable long insId)
    {
        return courseService.findByInstId(insId);
    }

    @PostMapping("/course/")
    public ResponseEntity<Object> AddCourse(@RequestBody Course course)
    {
        Course c = courseService.save(course);
        URI location = ServletUriComponentsBuilder
                        .fromPath("{id}")
                        .buildAndExpand(c.getId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }

}
