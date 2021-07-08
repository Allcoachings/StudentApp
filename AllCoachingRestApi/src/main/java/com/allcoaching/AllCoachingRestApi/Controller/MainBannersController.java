package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.MainBannersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/mainbanners/")
public class MainBannersController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private MainBannersService mainBannersService;

    @PostMapping("/upload/")
    public ResponseEntity<Object> uploadBanner(
            @RequestParam("file") MultipartFile image,
            @RequestParam("bannerLink") String bannerLink,
            @RequestParam("placeholder") String placeHolder
    ) {
        String bannerImageLink = "files/";
        bannerImageLink += fileUploadService.storeFile(image);
        MainBanners mainBanners = new MainBanners(bannerImageLink, bannerLink, placeHolder);
        MainBanners mainBanners_saved = mainBannersService.save(mainBanners);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/{id}").buildAndExpand(mainBanners_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/")
    public Iterable<MainBanners> findAll() {
        return mainBannersService.findAll();
    }


}
