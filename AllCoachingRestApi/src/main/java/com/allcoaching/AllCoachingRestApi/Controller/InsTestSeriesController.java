package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.InsTestSeriesService;
import com.allcoaching.AllCoachingRestApi.dto.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/testseries")
@Api(value="instituteAdmin",description = "Insitiute and Admin Test series controller")
public class InsTestSeriesController {

    @Autowired
    private InsTestSeriesService insTestSeriesService;


    @Autowired
    private FileUploadService fileUploadService;
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
    public @ResponseBody Iterable<TestSeriesQuestionDto> saveSeriesQuestions(@RequestBody Iterable<InsTestSeriesQuestions> insTestSeriesQuestions)
    {
        List<TestSeriesQuestionDto> testSeriesQuestionDtos = new ArrayList<>();
        insTestSeriesQuestions.forEach(item->{
                InsTestSeriesQuestions insTestSeriesQuestions_saved =  insTestSeriesService.saveSeriesQuestionOneByOne(item);
                testSeriesQuestionDtos.add(new TestSeriesQuestionDto(insTestSeriesQuestions_saved));

        });
        return  testSeriesQuestionDtos;
    }

    //fetching all test series of a course by course id
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{courseId}/{offset}/{dataLimit}")
    public Iterable<InsTestSeries> findByCourseId(@PathVariable long courseId,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByCourseID(courseId,offset,dataLimit);
    }

    //fetching all test series of a course by course id and hidden parameter
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{courseId}/hidden/{hidden}/{offset}/{dataLimit}")
    public Iterable<InsTestSeries> getTestSeriesByCourseIDAndHidden(@PathVariable long courseId,@PathVariable boolean hidden,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByCourseIDAndHidden(courseId,hidden,offset,dataLimit);
    }


    //fetching questions by series id
    @CrossOrigin(origins = "*")
    @GetMapping("/questions/{seriesId}/{page}/{pagesize}")
    public Iterable<TestSeriesQuestionDto> findQuestionsBySeriesId(@PathVariable long seriesId, @PathVariable int page, @PathVariable int pagesize)
    {
        return insTestSeriesService.getSeriesQuestion(seriesId,page,pagesize);
    }


    //fetch Test Series by playlistId
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{playListId}/{offset}/{dataLimit}")
    public Iterable<InsTestSeries> findByPlaylistId(@PathVariable long playListId,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByPlaylistID(playListId,offset,dataLimit);
    }

    //fetch Test Series by playlistId for user
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/foruser/{userId}/{playListId}/{offset}/{dataLimit}")
    public Iterable<TestSeriesAndUserResponseDto> findByPlaylistIdForUser(@PathVariable long userId, @PathVariable long playListId, @PathVariable int offset, @PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByPlaylistIDWithUserResponse(userId,playListId,offset,dataLimit);
    }

    //fetch Test Series by courseId for user
    @CrossOrigin(origins = "*")
    @GetMapping("/courseId/foruser/{userId}/{courseId}/{offset}/{dataLimit}")
    public Iterable<TestSeriesAndUserResponseDto> getTestSeriesByCourseIdAndIsAdminWithUserResponse(@PathVariable long userId, @PathVariable long courseId, @PathVariable int offset, @PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByCourseIdAndIsAdminWithUserResponse(userId,courseId,offset,dataLimit);
    }

    //fetch Test Series by playlistId and hidden parameter
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{playListId}/hidden/{hidden}/{offset}/{dataLimit}")
    public Iterable<InsTestSeries> getTestSeriesByPlaylistIDAndHidden(@PathVariable long playListId,@PathVariable boolean hidden,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return insTestSeriesService.getTestSeriesByPlaylistIDAndHidden(playListId,hidden,offset,dataLimit);
    }

    //fetch Test Series by id
    @CrossOrigin(origins = "*")
    @GetMapping("/byid/{id}")
    public Optional<InsTestSeries> findById(@PathVariable long id)
    {
        return insTestSeriesService.findById(id);
    }

    //fetch Test Series playlists by courseId
    @CrossOrigin(origins = "*")
    @GetMapping("all/playlists/{courseId}")
    public Iterable<InsTestSeriesPlaylist> findAllPlaylists(@PathVariable long courseId)
    {
         return  insTestSeriesService.findPlaylistByCourseId(courseId);
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
    @CrossOrigin(origins="*")
    @PutMapping("/updatePlaylist/{playlist_id}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable long playlist_id,@PathVariable long id)
    {
        insTestSeriesService.updatePlaylistIdById(playlist_id,id);
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
    @DeleteMapping("/delete/series/playlist/{playlistId}")
    public ResponseEntity<Object> deleteTestSeriesPlaylistById(@PathVariable long playlistId)
    {
        insTestSeriesService.deleteTestSeriesPlaylistById(playlistId);
        return  ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/demo/{status}/{id}")
    public  ResponseEntity<Object> updateDemoStatus(@PathVariable boolean status,@PathVariable long id)
    {
        insTestSeriesService.updateDemoStatusById(status,id);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/series/question/{id}")
    public ResponseEntity<Object> deleteSeriesQuestionById(@PathVariable long id)
    {
        insTestSeriesService.deleteSeriesQuestionById(id);
        return  ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/update/series/question/details/{id}")
    public ResponseEntity<Object> updateSeriesQuestionDetailsById(@RequestBody InsTestSeriesQuestions question)
    {
        insTestSeriesService.updateQuestionDetails(question.getExplanation(),question.getCorrectOpt(),question.getId());
        return  ResponseEntity.ok().build();
    }




    //save only test test series with questions
    @CrossOrigin(origins = "*")
    @PostMapping("/save/testseries")
    public ResponseEntity<Object> saveTestSeries(@RequestBody InsTestSeries insTestSeries)
    {
        InsTestSeries insTestSeries_saved = insTestSeriesService.createTestSeries(insTestSeries);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insTestSeries_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return  ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value="/series/addquestion/{seriesId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody InsTestSeriesQuestions addQuestion(@ModelAttribute QuestionDto questionDto,@PathVariable long seriesId)
    {
        String seriesQuestion="";
        switch (questionDto.getQuestionType())
        {


            case 1:
            case 3:
                seriesQuestion = questionDto.getQuestionText();
                break;
            case 2:
            case 4:
                String imageAddr = "files/";
                imageAddr += fileUploadService.storeFile(questionDto.getQuestionImage());
                seriesQuestion = imageAddr;
                break;
        }

        String optionA="",optionB="",optionC="",optionD="";
        switch (questionDto.getOptionType())
        {
            case 1:
                optionA = questionDto.getOptionAText();
                optionB = questionDto.getOptionBText();
                optionC = questionDto.getOptionCText();
                optionD = questionDto.getOptionDText();

                break;
            case 2:

                optionA = "files/";
                optionB = "files/";
                optionC = "files/";
                optionD = "files/";

                optionA += fileUploadService.storeFile(questionDto.getOptionAImage());
                optionB += fileUploadService.storeFile(questionDto.getOptionBImage());
                optionC += fileUploadService.storeFile(questionDto.getOptionCImage());
                optionD += fileUploadService.storeFile(questionDto.getOptionDImage());

                break;
        }
        InsTestSeriesQuestions insTestSeriesQuestions = new InsTestSeriesQuestions(seriesQuestion,optionA,optionB,optionC,optionD,questionDto.getCorrectOpt(),questionDto.getExplanation(),questionDto.getQuestionType(),questionDto.getOptionType(),questionDto.getTestSeriesId());
        if(questionDto.getMode().equals("edit"))
        {
            insTestSeriesQuestions.setId(questionDto.getQuestionId());
        }
//        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insTestSeriesQuestions_saved.getId()).toUri();
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Access-Control-Expose-Headers", "Location");
        return insTestSeriesService.saveSeriesQuestionOneByOne(insTestSeriesQuestions);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value="/series/addquestion/bulk/{seriesId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<TestSeriesQuestionDto> addQuestionMultiple(@ModelAttribute Iterable<QuestionDto> questionDtos,@PathVariable long seriesId) {
        List<TestSeriesQuestionDto> questionDtos_saved =  new ArrayList<>();
        questionDtos.forEach(questionDto -> {



                String seriesQuestion = "";
                switch (questionDto.getQuestionType()) {


                    case 1:
                    case 3:
                        seriesQuestion = questionDto.getQuestionText();
                        break;
                    case 2:
                    case 4:
                        String imageAddr = "files/";
                        imageAddr += fileUploadService.storeFile(questionDto.getQuestionImage());
                        seriesQuestion = imageAddr;
                        break;
                }

                String optionA = "", optionB = "", optionC = "", optionD = "";
                switch (questionDto.getOptionType()) {
                    case 1:
                        optionA = questionDto.getOptionAText();
                        optionB = questionDto.getOptionBText();
                        optionC = questionDto.getOptionCText();
                        optionD = questionDto.getOptionDText();

                        break;
                    case 2:

                        optionA = "files/";
                        optionB = "files/";
                        optionC = "files/";
                        optionD = "files/";

                        optionA += fileUploadService.storeFile(questionDto.getOptionAImage());
                        optionB += fileUploadService.storeFile(questionDto.getOptionBImage());
                        optionC += fileUploadService.storeFile(questionDto.getOptionCImage());
                        optionD += fileUploadService.storeFile(questionDto.getOptionDImage());

                        break;
                }
                InsTestSeriesQuestions insTestSeriesQuestions = new InsTestSeriesQuestions(seriesQuestion, optionA, optionB, optionC, optionD, questionDto.getCorrectOpt(), questionDto.getExplanation(),   questionDto.getQuestionType(), questionDto.getOptionType(), questionDto.getTestSeriesId());
                if (questionDto.getMode().equals("edit")) {
                    insTestSeriesQuestions.setId(questionDto.getQuestionId());
                }
                InsTestSeriesQuestions insTestSeriesQuestions_saved = insTestSeriesService.saveSeriesQuestionOneByOne(insTestSeriesQuestions);
                questionDtos_saved.add(new TestSeriesQuestionDto(insTestSeriesQuestions_saved));
        });
        return questionDtos_saved;
    }
    @CrossOrigin(origins = "*")
    @PutMapping(value="/series/updatequestiondata/",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateQuestion(@ModelAttribute EditQuestionDto editQuestionDto)
    {
        String fieldValue = null;
        switch (editQuestionDto.getType())
        {
            case "file":
                fieldValue = "files/";
                fieldValue += fileUploadService.storeFile(editQuestionDto.getFile());
                break;
            case "text":
                fieldValue=editQuestionDto.getText();
                break;
        }
        insTestSeriesService.updateQuestionData(fieldValue,editQuestionDto.getFieldName(),editQuestionDto.getFieldDbType(),editQuestionDto.getQuestionId());
        return  fieldValue;
    }

}
