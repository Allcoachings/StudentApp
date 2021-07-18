package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.StudentHistory;
import com.allcoaching.AllCoachingRestApi.Service.StudentHistoryService;
import com.allcoaching.AllCoachingRestApi.dto.StudentHistoryDto;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/v1/student/history/")
public class StudentHistoryController {


    @Autowired
    private StudentHistoryService studentHistoryService;

    @CrossOrigin(origins = "*")
    @GetMapping("fetch/{studentId}/{offset}/{data_limit}")
    public   Iterable<StudentHistoryDto> findStudentHistory(@PathVariable  long studentId,@PathVariable int offset,@PathVariable  int data_limit)
    {
        return studentHistoryService.findAllByStudentId(studentId,offset,data_limit);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity<Object> save(@RequestBody StudentHistory studentHistory)
    {
         StudentHistory studentHistory_saved = studentHistoryService.saveHistory(studentHistory);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(studentHistory_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}