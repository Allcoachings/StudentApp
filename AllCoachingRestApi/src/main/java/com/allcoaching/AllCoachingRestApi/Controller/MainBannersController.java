package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.MainBannersService;
import io.swagger.annotations.Api;
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
@Api(value = "admin",description = "Admin Controller for adding Banners")
public class MainBannersController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private MainBannersService mainBannersService;

    @CrossOrigin(origins = "*")
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
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        URI location = ServletUriComponentsBuilder.fromPath("{id}*{imageAddr}").buildAndExpand(mainBanners_saved.getId(),bannerImageLink).toUri();
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Iterable<MainBanners> findAll() {
        return mainBannersService.findAll();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deleteBanner(@PathVariable long id)
    {
                mainBannersService.deleteById(id);
                return ResponseEntity.ok().build();
    }


    @CrossOrigin(origins = "*")
    @PutMapping("/details")
    public  ResponseEntity<Object> updateBanner(@RequestBody MainBanners mainBanners)
    {
        mainBannersService.updateBannerDetails(mainBanners);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/image")
    public  ResponseEntity<Object> updateBannerImage(@RequestParam MultipartFile file,@RequestParam  long id)
    {
        String fileAddr = "files/";
        fileAddr += fileUploadService.storeFile(file);
        MainBanners banner = new MainBanners();
        banner.setBannerImageLink(fileAddr);
        banner.setId(id);
        mainBannersService.updateBannerImage(banner);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("{image_addr}").buildAndExpand(fileAddr).toUri();
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("byplaceholder/{placeholder}")
    public Iterable<MainBanners> findByPlaceholder(@PathVariable String placeholder)
    {
        return mainBannersService.findByPlaceholder(placeholder);
    }

}
