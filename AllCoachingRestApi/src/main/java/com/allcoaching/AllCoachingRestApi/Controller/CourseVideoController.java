package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.*;
import com.allcoaching.AllCoachingRestApi.Service.CourseVideoCommentsService;
import com.allcoaching.AllCoachingRestApi.Service.CourseVideoService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Utils.YTUrlExtractor;
import com.allcoaching.AllCoachingRestApi.dto.LiveVideoDto;
import com.allcoaching.AllCoachingRestApi.dto.YTExtractorDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.websocket.server.PathParam;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/video")
@Api()
public class CourseVideoController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private CourseVideoService courseVideoService;

    @Autowired
    private CourseVideoCommentsService courseVideoCommentsService;




    @CrossOrigin(origins = "*")
    @PostMapping("/testYt")
    public @ResponseBody YTExtractorDto test(@RequestBody String ytUrl)
    {
        return YTUrlExtractor.getYTUrlExtractor(ytUrl);

    }


    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> saveVideo(@RequestParam("file")MultipartFile video,
                                            @RequestParam("thumb") MultipartFile thumb,
                                            @RequestParam("name") String name,
                                            @RequestParam("description") String descriptions,
                                            @RequestParam("isDemo") boolean isDemo,
                                            @RequestParam("demoLength") String demoLength,
                                            @RequestParam("courseId") long courseId,
                                            @RequestParam("playlistId") long playlistId)

    {
        String courseVideoLink = "files/";
        courseVideoLink += fileUploadService.storeFile(video);
        String videoThumb = "files/";
        videoThumb +=fileUploadService.storeFile(thumb);
        CourseVideo courseVideo =courseVideoService.saveCourseVideo( new CourseVideo(courseVideoLink,name,descriptions,isDemo,demoLength,courseId,playlistId,videoThumb));
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{addr}").buildAndExpand(courseVideo.getId(),courseVideoLink).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/saveLiveVideo")
    public ResponseEntity<Object> saveLiveVideo(@ModelAttribute LiveVideoDto liveVideoDto)

    {

        try {
            String videoThumb = "files/";
            if(liveVideoDto.getThumbnail()== null)
            {
                videoThumb = "";
            }else
            {
                videoThumb +=fileUploadService.storeFile(liveVideoDto.getThumbnail());
            }
            YTExtractorDto ytExtractorDto = new YTExtractorDto();
            if(!liveVideoDto.getVideoLocation().isEmpty())
            {
                ytExtractorDto =  YTUrlExtractor.getYTUrlExtractor(liveVideoDto.getVideoLocation());
            }
            CourseVideo courseVideo = new CourseVideo(ytExtractorDto.getUrl(),liveVideoDto.getName(),liveVideoDto.getDescription(),liveVideoDto.isDemo(),null,liveVideoDto.getCourseId(),0,videoThumb);
            courseVideo.setVideoType("live");
            courseVideo.setLiveClassDate(liveVideoDto.getLiveClassDate());
            courseVideo.setLiveClassTime(liveVideoDto.getLiveClassTime());
            courseVideo.setId(liveVideoDto.getId());
            courseVideo.setVideoFormatJson(new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(ytExtractorDto));
            CourseVideo courseVideo_saved =courseVideoService.saveCourseVideo(courseVideo);
            URI location = ServletUriComponentsBuilder.fromPath("{id}*{addr}").buildAndExpand(courseVideo_saved.getId(), URLEncoder.encode(courseVideo_saved.getVideoLocation(), StandardCharsets.UTF_8.toString())).toUri();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Expose-Headers", "Location");
            return ResponseEntity.created(location).headers(headers).build();
        } catch (JsonProcessingException |UnsupportedEncodingException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        

    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateVideo")
    public ResponseEntity<Object> updateVideo(@RequestParam("file") MultipartFile file,@RequestParam("videoId") long videoId)
    {
        String courseVideoLink = "files/";
        courseVideoLink += fileUploadService.storeFile(file);
        courseVideoService.updateVideoLink(videoId,courseVideoLink);
        URI location = ServletUriComponentsBuilder.fromPath("{location}").buildAndExpand(courseVideoLink).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateLiveVideoLink/{videoId}")
    public ResponseEntity<Object> updateLiveVideoLink(@RequestBody String videoLink,@PathVariable("videoId") long videoId)
    {


        try {
            YTExtractorDto ytExtractorDto = YTUrlExtractor.getYTUrlExtractor(videoLink);
            courseVideoService.updateLiveVideoLink(videoId,ytExtractorDto.getUrl(),new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(ytExtractorDto));
            URI location = ServletUriComponentsBuilder.fromPath("{location}").buildAndExpand(videoLink).toUri();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Expose-Headers", "Location");
            return ResponseEntity.created(location).headers(headers).build();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateVideoThumb")
    public ResponseEntity<Object> updateVideoThumb(@RequestParam("file") MultipartFile file,@RequestParam("videoId") long videoId)
    {
        String courseVideoLink = "files/";
        courseVideoLink += fileUploadService.storeFile(file);
        courseVideoService.updateVideoThumbLink(videoId,courseVideoLink);
        URI location = ServletUriComponentsBuilder.fromPath("{location}").buildAndExpand(courseVideoLink).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/editVideoDetails")
    public ResponseEntity<Object> editDetails(@RequestBody CourseVideo courseVideo)
    {
        courseVideoService.saveCourseVideo(courseVideo);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/playlist/{id}")
//    public Iterable<CourseVideo> findByPlalist(long id)
//    {
//        return courseVideoService.findByPlaylist(id);
//
//    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}/{offset}/{dataLimit}")
    public Iterable<CourseVideo> findByCourse(@PathVariable  long id,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseVideoService.findByCourseId(id,offset,dataLimit);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/liveVideosOfCourse/{id}/{offset}/{dataLimit}")
    public Iterable<CourseVideo> findLiveVideoByCourse(@PathVariable  long id,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseVideoService.findLiveVideosByCourseId(id,offset,dataLimit);

    }


    //fetching playlist by course id and hidden parameter
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}/hidden/{hidden}/{offset}/{dataLimit}")
    public Iterable<CourseVideo> findByCourse(@PathVariable  long id,@PathVariable boolean hidden,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseVideoService.findByCourseIdAndHidden(id,hidden,offset,dataLimit);

    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<CourseVideo> findById(@PathVariable long id)
    {
        return courseVideoService.findById(id);

    }
    @CrossOrigin(origins = "*")
    @PostMapping("/createPlaylist")
    public ResponseEntity<Object> createPlaylist(@RequestBody VideoPlaylist videoPlaylist)
    {
        VideoPlaylist videoPlaylist_saved = courseVideoService.createPlaylist(videoPlaylist);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(videoPlaylist_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");

        return ResponseEntity.created(location).headers(headers).build();

    }

    //mapping for fetching video playlists
    @CrossOrigin(origins = "*")
    @GetMapping("/playlists/{id}")
    public Iterable<VideoPlaylist> findVideoPlaylist(@PathVariable long id)
    {
        return courseVideoService.findPlaylists(id);
    }

    //mapping for fetching videos of a playlist
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{id}/{offset}/{dataLimit}")
    public  Iterable<CourseVideo> findPlaylistById(@PathVariable long id,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseVideoService.findByPlaylist(id,offset,dataLimit);
    }

    //mapping for fetching videos of a playlist with hidden parameter
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{id}/hidden/{hidden}/{offset}/{dataLimit}")
    public  Iterable<CourseVideo> findPlaylistByIdAndHidden(@PathVariable long id,@PathVariable boolean hidden,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseVideoService.findByPlaylistAndHidden(id,hidden,offset,dataLimit);
    }


    @CrossOrigin(origins="*")
    @PutMapping("/publish/{status}/{id}")
    public  ResponseEntity<Object> updatePublishedStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseVideoService.updatePublishedStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/hidden/{status}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseVideoService.updateHiddenStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/demo/{status}/{id}")
    public  ResponseEntity<Object> updateDemoStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseVideoService.updateDemoStatusById(status,id);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins="*")
    @PutMapping("/updatePlaylist/{playlist_id}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable long playlist_id,@PathVariable long id)
    {
        courseVideoService.updatePlaylistIdById(playlist_id,id);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id)
    {
        courseVideoService.delete(id);
        return ResponseEntity.ok().build();
    }


    //count course videos
    @CrossOrigin(origins = "*")
    @GetMapping("/count/{courseId}")
    public long countDocumentByCourse(@PathVariable  long courseId )
    {
        return courseVideoService.countCourseVideo(courseId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/comment/add")
    public ResponseEntity<Object> addComment(@RequestBody CourseVideoComments courseVideoComments)
    {
        CourseVideoComments courseVideoComments_saved = courseVideoCommentsService.addComment(courseVideoComments);
        URI location  = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(courseVideoComments_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/views/{v_id}")
    public ResponseEntity<Object> videoView(@PathVariable long v_id )
    {
         courseVideoService.updateVideoViewsById(v_id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/comment/{v_id}/{page}/{page_size}")
    public Iterable<CourseVideoComments> fetch_comments(@PathVariable long v_id,@PathVariable int page,@PathVariable int page_size)
    {
        return  courseVideoCommentsService.fetch_comments(v_id,page,page_size);
    }


    //delete Video playlist
    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/playlist/{playlistId}")
    public ResponseEntity<Object> deletePlaylist(@PathVariable  long playlistId)
    {
        courseVideoService.deletePlaylist(playlistId);
        return  ResponseEntity.ok().build();
    }
}
