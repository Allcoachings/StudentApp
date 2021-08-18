package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedCategory;
import com.allcoaching.AllCoachingRestApi.Service.FeedCategoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/feedcategory")
@Api()
public class FeedCategoryController {
    
    @Autowired
    private FeedCategoryService feedCategoryService;

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Iterable<FeedCategory>  findAll()
    {
        return feedCategoryService.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody FeedCategory category)
    {
        FeedCategory saved_category = feedCategoryService.save(category);
        URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(saved_category.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<FeedCategory> findById(@PathVariable long id)
    {
        return feedCategoryService.findById(id);
    }

}
