package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseDocumentService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/document")
public class CourseDocumentController {

    @Autowired
    private CourseDocumentService courseDocumentService;
    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/playlist")
    public ResponseEntity<Object> createPlaylist(@RequestBody DocumentPlaylist documentPlaylist)
    {
        DocumentPlaylist documentPlaylist_saved =  courseDocumentService.createPlaylist(documentPlaylist);
        URI location  = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(documentPlaylist_saved.getId())
                .toUri();

        return  ResponseEntity.created(location).build();

    }

    @PostMapping("/")
    public ResponseEntity<Object> saveDocument(
            @RequestParam("file") MultipartFile document,
            @RequestParam("category") String category,
            @RequestParam("name") String name,
            @RequestParam("courseId") long courseId,
            @RequestParam("playlistId") long playlistId

            )
    {

        String documentAddr = "files/";
        documentAddr += fileUploadService.storeFile(document);
        CourseDocument courseDocument = courseDocumentService.save(new CourseDocument(category,documentAddr,name,courseId));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(courseDocument.getId()).toUri();
        return ResponseEntity.created(location).build();
    }


    @GetMapping("/{id}")
    public Optional<CourseDocument> findById(@PathVariable long id)
    {
        return courseDocumentService.findById(id);
    }

    @GetMapping("/playlist/{id}")
    public Optional<DocumentPlaylist> findByPlaylist(@PathVariable  long id )
    {
        return courseDocumentService.findByPlaylistId(id);
    }

    @GetMapping("/byCourse/{id}")
    public  Iterable<CourseDocument> findByCourseId(long id)
    {
        return courseDocumentService.findByCourseId(id);
    }


}
