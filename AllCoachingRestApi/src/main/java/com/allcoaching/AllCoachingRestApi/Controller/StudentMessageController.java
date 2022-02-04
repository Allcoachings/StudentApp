package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
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



    @CrossOrigin(origins = "*")
    @GetMapping("UnSeenStudentMessageCount")
    public long unseenTransactionCount(@RequestParam(name = "forAdmin") boolean forAdmin)
    {
        return studentMessageService.getStudentMessageUnseenCount(forAdmin);

    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateMessageSeenStatus")
    public ResponseEntity<Object> updateMessageSeenStatus(@RequestParam(name = "messageId") long messageId,@RequestParam(name = "status") boolean status)
    {
          studentMessageService.updateMessageSeenStatus(messageId,status);
          return ResponseEntity.ok().build();

    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageType")
    public Iterable<StudentMessage> getStudentMessagesWithMessageType(@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        return  studentMessageService.getStudentMessagesWithMessageType(forAdmin,messageType,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessages")
    public Iterable<StudentMessage> getStudentMessages(@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        return  studentMessageService.getStudentMessages(forAdmin,page,pageSize);
    }
}
