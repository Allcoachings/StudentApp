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
        long rank = userResponsesService.countRankBy(insTestSeriesUserResponseBrief.getTestSeriesId(),insTestSeriesUserResponseBrief.getScore())+1;
        System.out.println("student rank "+rank);
        insTestSeriesUserResponseBrief.setRank(rank);
        int belowScore = userResponsesService.belowScore(insTestSeriesUserResponseBrief.getTestSeriesId(),insTestSeriesUserResponseBrief.getScore());
        int count =userResponsesService.totalStudents(insTestSeriesUserResponseBrief.getTestSeriesId());
        long percen = (belowScore/count)*100;
        String percentile = String.valueOf(percen);
        System.out.println("belowScore:"+belowScore+" count:"+count+" percentile:"+percentile+" long:"+percen);
        insTestSeriesUserResponseBrief.setPercentile(percentile);
        InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief_saved =  userResponsesService.saveUserResponse(insTestSeriesUserResponseBrief);
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{percentile}*{rank}*{count}").buildAndExpand(insTestSeriesUserResponseBrief_saved.getId(),percentile,rank,count).toUri();

        return ResponseEntity.created(location).build();
    }


    @CrossOrigin(origins="*")
    @GetMapping("/get-user-response/{responseId}")
    public Optional<InsTestSeriesUserResponseBrief> getResponse(@PathVariable long responseId)
    {
        return userResponsesService.userResponseBriefs(responseId);
    }

}
