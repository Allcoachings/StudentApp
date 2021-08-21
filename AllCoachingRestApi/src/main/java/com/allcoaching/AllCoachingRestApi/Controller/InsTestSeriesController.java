package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Service.InsTestSeriesService;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/institute/course/testseries")
@Api(value="instituteAdmin",description = "Insitiute and Admin Test series controller")
public class InsTestSeriesController {

    @Autowired
    private InsTestSeriesService insTestSeriesService;



    //for creating a playlist
    @CrossOrigin(origins = "*")
    @PostMapping("/createplaylist")
    public ResponseEntity<Object> createTestSeriesPlaylist(@RequestBody InsTestSeriesPlaylist insTestSeriesPlaylist)
    {
        InsTestSeriesPlaylist insTestSeriesPlaylist_saved = insTestSeriesService.createTestSeriesPlaylist(insTestSeriesPlaylist);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insTestSeriesPlaylist_saved.getId()).toUri();
        return ResponseEntity.created(location).build();

    }

    //count course testseries
    @CrossOrigin(origins = "*")
    @GetMapping("/count/{courseId}")
    public long countByCourseId(@PathVariable long courseId)
    {
        return  insTestSeriesService.countCourseTestSeries(courseId);
    }



    //for creating a test series TestSeriesDto should be passed
    @CrossOrigin(origins = "*")
    @PostMapping("/createseries")
    public ResponseEntity<Object> createTestSeries(@RequestBody TestSeriesDto testSeriesDto)
    {
        InsTestSeries insTestSeries_saved = insTestSeriesService.createTestSeries(testSeriesDto.getTestSeries());
        Iterable<InsTestSeriesQuestions> insTestSeriesQuestions = testSeriesDto.getQuestions();
        insTestSeriesQuestions.forEach(question->question.setTestSeriesId(insTestSeries_saved.getId()));
        insTestSeriesService.saveSeriesQuestions(insTestSeriesQuestions);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insTestSeries_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    //for saving only questions to a test series array containing questions Object should be passed
    @CrossOrigin(origins = "*")
    @PostMapping("/savequestion")
    public ResponseEntity<Object> saveSeriesQuestions(@RequestBody Iterable<InsTestSeriesQuestions> insTestSeriesQuestions)
    {
        Iterable<InsTestSeriesQuestions> insTestSeriesQuestions_saved = insTestSeriesService.saveSeriesQuestions(insTestSeriesQuestions);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand("ok").toUri();
        return ResponseEntity.created(location).build();
    }

    //fetching all test series of a course by course id
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{courseId}")
    public Iterable<InsTestSeries> findByCourseId(@PathVariable long courseId)
    {
        return insTestSeriesService.getTestSeriesByCourseID(courseId);
    }


    //fetching questions by series id
    @CrossOrigin(origins = "*")
    @GetMapping("/questions/{seriesId}/{page}/{pagesize}")
    public Iterable<InsTestSeriesQuestions> findQuestionsBySeriesId(@PathVariable long seriesId,@PathVariable int page,@PathVariable int pagesize)
    {
        return insTestSeriesService.getSeriesQuestion(seriesId,page,pagesize);
    }


    //fetch Test Series by playlistId
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{playListId}/")
    public Iterable<InsTestSeries> findByPlaylistId(@PathVariable long playListId)
    {
        return insTestSeriesService.getTestSeriesByCourseID(playListId);
    }


    @CrossOrigin(origins="*")
    @PutMapping("/publish/{status}/{id}")
    public  ResponseEntity<Object> updatePublishedStatus(@PathVariable boolean status,@PathVariable long id)
    {
        insTestSeriesService.updatePublishedStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/hidden/{status}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable boolean status,@PathVariable long id)
    {
        insTestSeriesService.updateHiddenStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/series/{id}")
    public ResponseEntity<Object> deleteSeriesById(@PathVariable long id)
    {
        insTestSeriesService.deleteSeriesById(id);
        return  ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/series/question/{id}")
    public ResponseEntity<Object> deleteSeriesQuestionById(@PathVariable long id)
    {
        insTestSeriesService.deleteSeriesQuestionById(id);
        return  ResponseEntity.ok().build();
    }


}
