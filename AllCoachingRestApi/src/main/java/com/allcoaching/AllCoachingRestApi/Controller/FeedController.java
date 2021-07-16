package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Service.FeedService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.dto.FeedContentDto;
import com.allcoaching.AllCoachingRestApi.dto.FeedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @Autowired
    private FileUploadService fileUploadService;

    //for fetching all paged feed
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{page}/{pageSize}")
    public Iterable<FeedDto> getAllFeed(@PathVariable int page,@PathVariable int pageSize)
    {
        return feedService.getAllFeed(page, pageSize);
    }

    //for fetching institute paged feed
    @CrossOrigin(origins = "*")
    @GetMapping("/ins/{insId}/{page}/{pageSize}")
    public Iterable<FeedDto> getAllFeed(@PathVariable long insId,@PathVariable int page,@PathVariable int pageSize)
    {
        return feedService.getAllFeedIns(page, pageSize,insId);
    }


    //for adding feed to database
    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<Object> addFeed(@RequestBody FeedContentDto FeedContentDto)
    {
        Feed f = feedService.saveFeed(FeedContentDto);

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
}
