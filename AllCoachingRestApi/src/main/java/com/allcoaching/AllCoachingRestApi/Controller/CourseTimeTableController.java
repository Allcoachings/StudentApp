package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableSubject;
import com.allcoaching.AllCoachingRestApi.Service.CourseTimeTableService;
import com.allcoaching.AllCoachingRestApi.dto.CourseTimeTableDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/institute/course/timetable")
public class CourseTimeTableController {

    @Autowired
    private CourseTimeTableService service;

    @CrossOrigin(origins = "*")
    @PostMapping("/addsubject")
    public ResponseEntity<Object> addSubject(@RequestBody CourseTimeTableSubject courseTimeTableSubject)
    {
        CourseTimeTableSubject courseTimeTableSubject_saved = service.saveSubject(courseTimeTableSubject);
        URI location = ServletUriComponentsBuilder
                .fromPath("{id}")
                .buildAndExpand(courseTimeTableSubject_saved.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addsubjectitem")
    public ResponseEntity<Object> addSubjectItem(@RequestBody CourseTimeTableItem courseTimeTableItem)
    {
        CourseTimeTableItem courseTimeTableItem_saved = service.saveItem(courseTimeTableItem);
        URI location = ServletUriComponentsBuilder
                .fromPath("{id}")
                .buildAndExpand(courseTimeTableItem_saved.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{subject_id}")
    public CourseTimeTableDto fetchTimeTableBySubject(@PathVariable  long subject_id)
    {
        return service.fetchTimeTable(subject_id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{courseId}")
    public Iterable<CourseTimeTableDto>  fetchTimeTableByCourseId(@PathVariable long courseId)
    {
        return service.fetchCourseTimeTable(courseId);
    }


}