package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.AdminBlogs;
import com.allcoaching.AllCoachingRestApi.Respository.AdminBlogRepo;
import com.allcoaching.AllCoachingRestApi.Service.AdminBlogService;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/admin/blog")
@Api()
public class AdminBlogController {
    @Autowired
    private AdminBlogService adminBlogService;

    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{offset}/{limit}")
    public Iterable<AdminBlogs>  findAll(@PathVariable int offset,@PathVariable int limit)
    {
        return adminBlogService.findAll(offset,limit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/byId/{id}")
    public Optional<AdminBlogs> findById(@PathVariable  long id)
    {
        return adminBlogService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> addBlog(@RequestParam MultipartFile featureImage, @RequestParam String blogBody,@RequestParam String blogTitle)
    {

            String imageAddr = "files/";
            imageAddr += fileUploadService.storeFile(featureImage);
            AdminBlogs adminBlogs = new AdminBlogs(blogTitle,blogBody,imageAddr);
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
    public ResponseEntity<Object>  updateBlogWithImage(@RequestParam MultipartFile featureImage, @RequestParam String blogBody,@RequestParam String blogTitle,@RequestParam long id)
    {
        String imageAddr = "files/";
        imageAddr += fileUploadService.storeFile(featureImage);
        AdminBlogs adminBlogs = new AdminBlogs(blogTitle,blogBody,imageAddr);
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
