package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Respository.CourseBannersRepo;
import com.allcoaching.AllCoachingRestApi.Service.CourseBannersService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/banners/")
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
        return ResponseEntity.created(location).build();
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
}
