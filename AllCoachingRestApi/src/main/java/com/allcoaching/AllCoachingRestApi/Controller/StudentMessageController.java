package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.StudentMessage;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.StudentMessageImageService;
import com.allcoaching.AllCoachingRestApi.Service.StudentMessageService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/studentMessage")
@Api()
public class StudentMessageController {

    @Autowired
    private StudentMessageService studentMessageService;

    @Autowired
    private StudentMessageImageService studentMessageImageService;

    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<Object> addStudentMessage(@RequestBody StudentMessage studentMessage)
    {

        StudentMessage studentMessage_saved = studentMessageService.addStudentMessage(studentMessage);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(studentMessage_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }
}
