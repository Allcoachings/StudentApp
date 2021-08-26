package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import com.allcoaching.AllCoachingRestApi.Service.StudentService;
import com.allcoaching.AllCoachingRestApi.dto.SavePushTokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notification/")
public class ExpoPushNotificationController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private InstituteService instituteService;

    @CrossOrigin(origins="*")
    @PutMapping("/saveToken")
    public ResponseEntity<Object> savePushToken(@RequestBody SavePushTokenDto savePushTokenDto)
    {
        switch (savePushTokenDto.getMode())
        {
            case"student":
                    studentService.updatePushToken(savePushTokenDto.getId(),savePushTokenDto.getExpoToken());
                break;
            case "institute":

                    instituteService.updatePushToken(savePushTokenDto.getId(),savePushTokenDto.getExpoToken());
                break;
        }

        return ResponseEntity.ok().build();
    }
}
