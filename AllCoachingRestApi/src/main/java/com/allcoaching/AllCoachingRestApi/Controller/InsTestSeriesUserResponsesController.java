package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import com.allcoaching.AllCoachingRestApi.Service.InsTestSeriesUserResponsesService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/testSeries/")
@Api()
public class InsTestSeriesUserResponsesController {


    @Autowired
    private InsTestSeriesUserResponsesService userResponsesService;

    @CrossOrigin(origins="*")
    @PostMapping("/saveresponse")
    public ResponseEntity<Object> saveResponse(@RequestBody InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief)
    {
        InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief_saved =  userResponsesService.saveUserResponse(insTestSeriesUserResponseBrief);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insTestSeriesUserResponseBrief_saved.getId()).toUri();


        return ResponseEntity.created(location).build();
    }


    @CrossOrigin(origins="*")
    @GetMapping("/get-user-response/{responseId}")
    public Optional<InsTestSeriesUserResponseBrief> getResponse(long responseId)
    {
        return userResponsesService.userResponseBriefs(responseId);
    }


}
