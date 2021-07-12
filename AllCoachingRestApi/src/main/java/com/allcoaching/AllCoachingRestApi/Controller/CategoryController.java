package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Service.CategoryService;
import com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Iterable<Category>  findAll()
    {
        return categoryService.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody Category category)
    {
        Category saved_category = categoryService.save(category);
        URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(saved_category.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Category> findById(@PathVariable long id)
    {
        return categoryService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/dropDownMode/")
    public  Iterable<CategoryDropDownDto>  findAllForDropDown()
    {
        return categoryService.findByAllForDropdown();
    }

}
