package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Respository.CourseBannersRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseBannersService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import io.swagger.annotations.Api;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/banners/")
@Api()
public class CourseBannersController {

    @Autowired
    private CourseBannersService courseBannersService;
    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @PostMapping("/upload/")
    public ResponseEntity<Object> uploadBanner(
            @RequestParam("file") MultipartFile image,
            @RequestParam("courseId") long courseId
    ) {
        String bannerImageLink = "files/";
        bannerImageLink += fileUploadService.storeFile(image);
        CourseBanners courseBanners = new CourseBanners(bannerImageLink,courseId);
        CourseBanners courseBanners_saved = courseBannersService.save(courseBanners);
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{addr}").buildAndExpand(courseBanners_saved.getId(),bannerImageLink).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<CourseBanners> findById(@PathVariable long id)
    {
        return courseBannersService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{id}")
    public Iterable<CourseBanners> findByCourseId(@PathVariable long id)
    {
        return courseBannersService.findByCourseId(id);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/countbyCoureId/{id}")
    public long courseBannerCount(@PathVariable long id)
    {
        return courseBannersService.countCourseBanners(id);

    }

    @CrossOrigin(origins="*")
    @PutMapping("/publish/{status}/{id}")
    public  ResponseEntity<Object> updatePublishedStatus(@PathVariable boolean status,@PathVariable long id)
    {
        courseBannersService.updatePublishedStatusById(status,id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id)
    {
        courseBannersService.delete(id);
        return ResponseEntity.ok().build();
    }
}
