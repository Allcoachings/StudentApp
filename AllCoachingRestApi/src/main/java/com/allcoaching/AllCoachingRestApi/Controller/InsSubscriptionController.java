package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.InsSubscription;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Service.InsSubscriptionService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/subscription")
@Api(value = "student",description = "Student controller to subscribe and unsubscribe institute")
public class InsSubscriptionController {

    @Autowired
    private InsSubscriptionService insSubscriptionService;

    @CrossOrigin(origins = "*")
    @PostMapping("/subscribe")
    public ResponseEntity<Object> subscribeIns(@RequestBody InsSubscription insSubscription)
    {
        InsSubscription insSubscription_saved = insSubscriptionService.subscribsIns(insSubscription);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insSubscription_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/unsubscribe")
    public ResponseEntity<Object> unsubscribeIns(@RequestBody InsSubscription insSubscription)
    {
         insSubscriptionService.unsubscribe(insSubscription);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/checksubscription")
    public boolean checkSubscription(@RequestBody InsSubscription insSubscription)
    {
           return insSubscriptionService.checkSubscription(insSubscription);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/ins/{id}/{offset}/{dataLimit}")
    public  Iterable<Student> insSubscriptionList(@PathVariable long id,@PathVariable int offset,@PathVariable int dataLimit)
    {
         return insSubscriptionService.getInstituteSubscriptionList(id,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/student/{id}/{offset}/{dataLimit}")
    public  Iterable<Institute> StudentSubscriptionList(@PathVariable long id, @PathVariable int offset, @PathVariable int dataLimit)
    {
         return insSubscriptionService.getStudentSubscriptionList(id,offset,dataLimit);
    }





}
