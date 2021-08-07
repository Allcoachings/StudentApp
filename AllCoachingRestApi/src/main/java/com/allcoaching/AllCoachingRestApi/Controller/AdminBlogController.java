package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.AdminBlogs;
import com.allcoaching.AllCoachingRestApi.Respository.AdminBlogRepo;
import com.allcoaching.AllCoachingRestApi.Service.AdminBlogService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/v1/admin/blog")
public class AdminBlogController {
    @Autowired
    private AdminBlogService adminBlogService;

    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> addBlog(@RequestParam MultipartFile featureImage, @RequestParam String blogBody)
    {

            String imageAddr = "files/";
            imageAddr += fileUploadService.storeFile(featureImage);
            AdminBlogs adminBlogs = new AdminBlogs(blogBody,imageAddr);
            AdminBlogs adminBlogs_saved =  adminBlogService.addBlog(adminBlogs);
            URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminBlogs_saved).toUri();
            return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/")
    public ResponseEntity<Object> deleteBlog(long id)
    {
          adminBlogService.deleteBlog(id);
          return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/withimage")
    public ResponseEntity<Object>  updateBlogWithImage(@RequestParam MultipartFile featureImage, @RequestParam String blogBody,@RequestParam long id)
    {
        String imageAddr = "files/";
        imageAddr += fileUploadService.storeFile(featureImage);
        AdminBlogs adminBlogs = new AdminBlogs(blogBody,imageAddr);
        adminBlogs.setId(id);
        AdminBlogs adminBlogs_saved =  adminBlogService.addBlog(adminBlogs);

        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/withoutimage")
    public ResponseEntity<Object>  updateBlogWithImage( @RequestBody AdminBlogs adminBlogs)
    {

         adminBlogService.addBlog(adminBlogs);

        return ResponseEntity.ok().build();
    }
}
