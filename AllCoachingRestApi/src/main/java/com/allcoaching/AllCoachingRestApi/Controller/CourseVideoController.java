package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import com.allcoaching.AllCoachingRestApi.Service.CourseVideoService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.websocket.server.PathParam;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/video")
public class CourseVideoController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private CourseVideoService courseVideoService;
    @PostMapping("/")
    public ResponseEntity<Object> saveVideo(@RequestParam("file")MultipartFile video,
                                            @RequestParam("name") String name,
                                            @RequestParam("description") String descriptions,
                                            @RequestParam("isDemo") boolean isDemo,
                                            @RequestParam("demoLength") String demoLength,
                                            @RequestParam("courseId") long courseId,
                                            @RequestParam("playlistId") long playlistId)

    {
        String courseVideoLink = "files/";
        courseVideoLink += fileUploadService.storeFile(video);
        CourseVideo courseVideo =courseVideoService.saveCourseVideo( new CourseVideo(courseVideoLink,name,descriptions,isDemo,demoLength,courseId,playlistId));
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{addr}").buildAndExpand(courseVideo.getId(),courseVideoLink).toUri();

        return ResponseEntity.created(location).build();
    }

//    @GetMapping("/playlist/{id}")
//    public Iterable<CourseVideo> findByPlalist(long id)
//    {
//        return courseVideoService.findByPlaylist(id);
//
//    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}")
    public Iterable<CourseVideo> findByCourse(@PathVariable  long id)
    {
        return courseVideoService.findByCourseId(id);

    }
    @GetMapping("/{id}")
    public Optional<CourseVideo> findById(@PathVariable long id)
    {
        return courseVideoService.findById(id);

    }

    @PostMapping("/createPlaylist")
    public ResponseEntity<Object> createPlaylist(@RequestBody VideoPlaylist videoPlaylist)
    {
        VideoPlaylist videoPlaylist_saved = courseVideoService.createPlaylist(videoPlaylist);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(videoPlaylist_saved.getId()).toUri();
        return ResponseEntity.created(location).build();

    }

    //mapping for fetching video playlists
    @GetMapping("/playlists/{id}")
    public Iterable<VideoPlaylist> findVideoPlaylist(@PathVariable long id)
    {
        return courseVideoService.findPlaylists(id);
    }

    //mapping for fetching videos of a playlist
    @GetMapping("/playlist/{id}")
    public  Iterable<CourseVideo> findPlaylistById(@PathVariable long id)
    {
        return courseVideoService.findByPlaylist(id);
    }

}
