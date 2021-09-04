package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Entity.StudentPinList;
import com.allcoaching.AllCoachingRestApi.Service.StudentPinListService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/student/pin")
@Api()
public class StudentPinListController {

    @Autowired
    private StudentPinListService studentPinListService;

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> pinInstitute(@RequestBody StudentPinList studentPinList)
    {
        StudentPinList studentPinList_saved = studentPinListService.save(studentPinList);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(studentPinList_saved.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/student/{page}/{pageSize}")
    public Iterable<StudentPinList> pinInstitute(@RequestBody Student student,@PathVariable int page,@PathVariable int pageSize)
    {
        return  studentPinListService.findAllByStudentId(student,page,pageSize);
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable long id)
    {
        studentPinListService.deleteById(id);
    }



}
