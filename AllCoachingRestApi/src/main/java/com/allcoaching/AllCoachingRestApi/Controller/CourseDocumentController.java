package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseDocumentService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");

        return ResponseEntity.created(location).headers(headers).build();

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
    @PutMapping("/updateDocument")
    public ResponseEntity<Object> updateDocument(@RequestParam("file") MultipartFile file,@RequestParam("documentId") long documentId)
    {
        String documentAddr = "files/";
        documentAddr += fileUploadService.storeFile(file);
        courseDocumentService.updateDocumentLink(documentAddr,documentId);

        URI location = ServletUriComponentsBuilder.fromPath("{documentAddr}").buildAndExpand(documentAddr).toUri();
        return  ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateDocumentDetails")
    public ResponseEntity<Object> updateDocumentDetails(@RequestBody CourseDocument courseDocument)
    {
        courseDocumentService.save(courseDocument);
        return  ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<CourseDocument> findById(@PathVariable long id)
    {
        return courseDocumentService.findById(id);
    }

    //fetch documents using playlist id
    @CrossOrigin(origins = "*")
    @GetMapping("/playlist/{id}/{offset}/{dataLimit}")
    public Iterable<CourseDocument> findByPlaylist(@PathVariable  long id,@PathVariable int offset,@PathVariable int dataLimit )
    {
        return courseDocumentService.findByPlaylistId(id,offset,dataLimit);
    }

    //count course documents
    @CrossOrigin(origins = "*")
    @GetMapping("/count/{courseId}")
    public long countDocumentByCourse(@PathVariable  long courseId )
    {
        return courseDocumentService.countCourseDocuments(courseId);
    }

    //fetch documents using course id
    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}/{offset}/{dataLimit}")
    public  Iterable<CourseDocument> findByCourseId(@PathVariable  long id,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return courseDocumentService.findByCourseId(id,offset,dataLimit);
    }

    //fetching document playlists by course id
    @CrossOrigin(origins = "*")
    @GetMapping("/playlists/{id}")
    public  Iterable<DocumentPlaylist> findPlaylists(@PathVariable  long id)
    {
        return courseDocumentService.findByDocumentPlaylists(id);
    }

    @CrossOrigin(origins="*")
    @PutMapping("/publish/{status}/{id}")
    public  ResponseEntity<Object> updatePublishedStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseDocumentService.updatePublishedStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/hidden/{status}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseDocumentService.updateHiddenStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins="*")
    @PutMapping("/updatePlaylist/{playlist_id}/{id}")
    public  ResponseEntity<Object> updateHiddenStatus(@PathVariable long playlist_id,@PathVariable long id)
    {
        courseDocumentService.updatePlaylistIdById(playlist_id,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id)
    {
        courseDocumentService.delete(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/playlist/{playlistId}")
    public ResponseEntity<Object> deletePlaylistById(@PathVariable long playlistId)
    {
        courseDocumentService.deletePlaylistById(playlistId);
        return ResponseEntity.ok().build();
    }





}
