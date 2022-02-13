package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
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
    @GetMapping("UnSeenStudentMessageCountForIns")
    public long unseenTransactionCountForIns(@RequestParam(name = "insId")long insId)
    {
        return studentMessageService.getStudentMessageUnseenCountForIns(insId);

    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateMessageSeenStatus")
    public ResponseEntity<Object> updateMessageSeenStatus(@RequestParam(name = "messageId") long messageId,@RequestParam(name = "status") boolean status)
    {
          studentMessageService.updateMessageSeenStatus(messageId,status);
          return ResponseEntity.ok().build();

    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateMessageSeenByInsStatus")
    public ResponseEntity<Object> updateMessageSeenByInsStatus(@RequestParam(name = "messageId") long messageId,@RequestParam(name = "status") boolean status)
    {
          studentMessageService.updateMessageSeenStatusForIns(messageId,status);
          return ResponseEntity.ok().build();

    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageType")
    public Iterable<StudentMessage> getStudentMessagesWithMessageType(@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        return  studentMessageService.getStudentMessagesWithMessageType(forAdmin,messageType,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageTypeByStudentId")
    public Iterable<StudentMessage> getStudentMessagesWithMessageTypeByStudent(@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="studentId") long studentId,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Student s  = new Student(studentId);
        return  studentMessageService.getStudentMessagesWithMessageTypeByStudent(forAdmin,messageType,s,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageTypeForIns")
    public Iterable<StudentMessage> getStudentMessagesWithMessageTypeForIns(@RequestParam(name = "insId") long insId,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        return  studentMessageService.getStudentMessagesWithMessageTypeForIns(institute,forAdmin,messageType,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageTypeAndRepliedAs")
    public Iterable<StudentMessage> getStudentMessagesWithMessageTypeAndRepliedAs(@RequestParam(name="replied") String replied,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        return  studentMessageService.getStudentMessagesWithMessageTypeAndReplied(Boolean.parseBoolean(replied),forAdmin,messageType,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesWithMessageTypeAndRepliedAsForIns")
    public Iterable<StudentMessage> getStudentMessagesWithMessageTypeAndRepliedAsForIns(@RequestParam(name = "insId") long insId,@RequestParam(name="replied") String replied,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="messageType") String messageType,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        return  studentMessageService.getStudentMessagesWithMessageTypeAndRepliedForIns(institute,Boolean.parseBoolean(replied),forAdmin,messageType,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessages")
    public Iterable<StudentMessage> getStudentMessages(@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {

        return  studentMessageService.getStudentMessages(forAdmin,page,pageSize);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("getStudentMessagesForIns")
    public Iterable<StudentMessage> getStudentMessagesForIns(@RequestParam(name="insId")long insId,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        return  studentMessageService.getStudentMessagesForIns(institute,forAdmin,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getChatListForInstitute")
    public Iterable<StudentMessage> getChatListForInstitute(@RequestParam(name="insId")long insId, @RequestParam(name="courseId")long courseId, @RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        return  studentMessageService.getChatListForInstitute(institute,courseId,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentChatForCourse")
    public Iterable<StudentMessage> findByInstituteAndCourseIdAndStudentOrderByMessageInitialTime(@RequestParam(name="insId")long insId, @RequestParam(name="courseId")long courseId, @RequestParam(name="studentId") long studentId,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        Student student = new Student(studentId);
        return  studentMessageService.findByInstituteAndCourseIdAndStudentOrderByMessageInitialTime(institute,student,courseId,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentAllMessagesRepliedAs")
    public Iterable<StudentMessage> getStudentAllMessagesRepliedAs(@RequestParam(name="replied") String replied,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        return  studentMessageService.getStudentMessagesReplied(Boolean.parseBoolean(replied),forAdmin,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getStudentAllMessagesRepliedAsForIns")
    public Iterable<StudentMessage> getStudentAllMessagesRepliedAsForIns(@RequestParam(name="insId")long insId,@RequestParam(name="replied") String replied,@RequestParam(name="forAdmin") boolean forAdmin,@RequestParam(name="page") int page, @RequestParam(name="pageSize") int pageSize)
    {
        Institute institute = new Institute(insId);
        return  studentMessageService.getStudentMessagesRepliedForIns(institute,Boolean.parseBoolean(replied),forAdmin,page,pageSize);
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("deleteById/{id}")
    public ResponseEntity<Object>  deleteByID(@PathVariable(name="id") long id)
    {
        studentMessageService.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
