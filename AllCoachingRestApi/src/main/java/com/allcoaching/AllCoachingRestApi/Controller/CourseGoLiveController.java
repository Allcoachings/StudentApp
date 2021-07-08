package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import com.allcoaching.AllCoachingRestApi.Service.CourseGoLiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/golive")
public class CourseGoLiveController {

    @Autowired
    private CourseGoLiveService courseGoLiveService;

    @GetMapping("/all/{courseId}")
    public Iterable<CourseGoLive> findByCourseId(@PathVariable long courseId)
    {
        return courseGoLiveService.findByCourseId(courseId);
    }

    @PostMapping("/")
    public ResponseEntity<Object> saveGoLive(@RequestBody CourseGoLive courseGoLive)
    {
        CourseGoLive courseGoLive_saved = courseGoLiveService.save(courseGoLive);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(courseGoLive_saved.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public Optional<CourseGoLive> findById(@PathVariable long id)
    {
        return courseGoLiveService.findById(id);
    }


}
