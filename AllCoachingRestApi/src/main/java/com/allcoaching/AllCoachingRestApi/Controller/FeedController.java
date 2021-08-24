package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedComments;
import com.allcoaching.AllCoachingRestApi.Service.FeedCommentService;
import com.allcoaching.AllCoachingRestApi.Service.FeedService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.dto.FeedContentDto;
import com.allcoaching.AllCoachingRestApi.dto.FeedDto;
import io.swagger.annotations.Api;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/feed")
@Api()
public class FeedController {

    @Autowired
    private FeedService feedService;
    @Autowired
    private FeedCommentService feedCommentService;
    @Autowired
    private FileUploadService fileUploadService;

    //for fetching all paged feed
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{page}/{pageSize}")
    public Iterable<FeedDto> getAllFeed(@PathVariable int page,@PathVariable int pageSize)
    {
        return feedService.getAllFeed(page, pageSize);
    }

    //for fetching feed by tags (the feed categories are special tags saved by admin)
    @CrossOrigin(origins = "*")
    @GetMapping("/bytag/{page}/{pageSize}/{tag}")
    public Iterable<FeedDto> getAllFeedByTagContaining(@PathVariable int page,@PathVariable int pageSize,@PathVariable String tag)
    {
        return feedService.getAllFeedByTagContaining(page, pageSize,"#"+tag);
    }

    //for fetching institute paged feed
    @CrossOrigin(origins = "*")
    @GetMapping("/ins/{insId}/{page}/{pageSize}")
    public Iterable<FeedDto> getAllFeed(@PathVariable long insId,@PathVariable int page,@PathVariable int pageSize)
    {
        return feedService.getAllFeedIns(page, pageSize,insId);
    }

    //for fetching student paged feed
    @CrossOrigin(origins = "*")
    @GetMapping("/student/{studentId}/{page}/{pageSize}")
    public Iterable<FeedDto> getAllFeedStudent(@PathVariable long studentId,@PathVariable int page,@PathVariable int pageSize)
    {
        return feedService.getAllFeedStudent(page, pageSize,studentId);
    }


    //for adding feed to database
    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<Object> addFeed(@RequestBody FeedContentDto feedContentDto)
    {

        System.out.println(feedContentDto);
        Feed f = feedService.saveFeed(feedContentDto);

        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(f.getId()).toUri();
        return ResponseEntity.created(location).build();
    }


    //for uploading feed image to server
    @CrossOrigin(origins = "*")
    @PostMapping("/uploadimage")
    public ResponseEntity<Object> uploadFeedImage(@RequestParam("image") MultipartFile image)
    {

        String imageLocation = "files/";
         imageLocation  += fileUploadService.storeFile(image);
        URI location = ServletUriComponentsBuilder.fromPath("{location}").buildAndExpand(imageLocation).toUri();
        return ResponseEntity.created(location).build();
    }



    //to like feed //likerType will tell it is an institute or a student
    @CrossOrigin(origins = "*")
    @GetMapping("/like/feed/{feedId}/{likerType}/{likerId}")
    public ResponseEntity<Object> likeFeed(@PathVariable long feedId,@PathVariable int likerType,@PathVariable long likerId)
    {

         feedService.likeFeed(feedId,likerType,likerId);
         return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/vote/feed/{feedId}/{optionId}/{voterType}/{voterId}")
    public ResponseEntity<Object> pollVote(@PathVariable long feedId,@PathVariable long optionId,@PathVariable int voterType,@PathVariable long voterId)
    {

         feedService.votePoll(feedId,voterType,voterId,optionId);
         return ResponseEntity.ok().build();
    }
    //to unlike feed
//    @CrossOrigin(origins = "*")
//    @GetMapping("/unlike/feed/{feedId}/{likerType}/{likerId}")
//    public ResponseEntity<Object> unlikeFeed(@PathVariable long feedId,@PathVariable int likerType,@PathVariable long likerId)
//    {
//
//         feedService.unlikeFeed(feedId,likerType,likerId);
//         return ResponseEntity.ok().build();
//    }


    //feed comment section



    //fetch feed comments
    @CrossOrigin(origins = "*")
    @GetMapping("feed/comment/{feedId}/{offset}/{dataLimit}")
    public  Iterable<FeedComments> fetch_feedComments(@PathVariable long feedId,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return feedCommentService.fetchCommentsByFeedId(feedId,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("feed/comment/{id}")
    public ResponseEntity<Object> deleteCommentById(@PathVariable long id)
    {
            feedCommentService.deleteCommentById(id);
            return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/feed/comment")
    public ResponseEntity<Object> addComment(@RequestBody FeedComments feedComments)
    {
        FeedComments feedComments_saved = feedCommentService.saveComment(feedComments);
        URI location =  ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(feedComments_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
