package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseDocumentService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.print.Doc;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/document")
@Api()
public class CourseDocumentController {

    @Autowired
    private CourseDocumentService courseDocumentService;
    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @PostMapping("/createPlaylist")
    public ResponseEntity<Object> createPlaylist(@RequestBody DocumentPlaylist documentPlaylist)
    {
        DocumentPlaylist documentPlaylist_saved =  courseDocumentService.createPlaylist(documentPlaylist);
        URI location  = ServletUriComponentsBuilder
                .fromPath("{id}")
                .buildAndExpand(documentPlaylist_saved.getId())
                .toUri();

        return  ResponseEntity.created(location).build();

    }


    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> saveDocument(
            @RequestParam("file") MultipartFile document,
            @RequestParam("name") String name,
            @RequestParam("courseId") long courseId,
            @RequestParam("playlistId") long playlistId)
    {

        String documentAddr = "files/";
        documentAddr += fileUploadService.storeFile(document);
        CourseDocument courseDocument = courseDocumentService.save(new CourseDocument(documentAddr,name,courseId,playlistId));
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{fileAddr}").buildAndExpand(courseDocument.getId(),documentAddr).toUri();
        return ResponseEntity.created(location).build();
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<CourseDocument> findById(@PathVariable long id)
    {
        return courseDocumentService.findById(id);
    }

    //fetch documents using playlist id
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{id}")
    public Iterable<CourseDocument> findByPlaylist(@PathVariable  long id )
    {
        return courseDocumentService.findByPlaylistId(id);
    }

    //fetch documents using course id
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}")
    public  Iterable<CourseDocument> findByCourseId(@PathVariable  long id)
    {
        return courseDocumentService.findByCourseId(id);
    }

    //fetching document playlists by course id
    @CrossOrigin(origins = "*")
    @GetMapping("/playlists/{id}")
    public  Iterable<DocumentPlaylist> findPlaylists(@PathVariable  long id)
    {
        return courseDocumentService.findByDocumentPlaylists(id);
    }

}
