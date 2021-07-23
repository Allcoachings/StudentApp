package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Service.AdminTestSeriesCategoryService;
import com.allcoaching.AllCoachingRestApi.Service.AdminTestSubCategoriesService;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/v1/admintestseries")
public class AdminTestSeriesCategoryController {

    @Autowired
    private AdminTestSeriesCategoryService adminTestSeriesCategoryService;
    @Autowired
    private AdminTestSubCategoriesService adminTestSubCategoriesService;

    @CrossOrigin(origins = "*")
    @PostMapping("/addCategory")
    public ResponseEntity<Object> createTestSeriseCategory(@RequestBody AdminTestSeriesCategory adminTestSeriesCategory)
    {
        AdminTestSeriesCategory adminTestSeriesCategory_saved =  adminTestSeriesCategoryService.save(adminTestSeriesCategory);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSeriesCategory_saved.getId()).toUri();
        return ResponseEntity.created(location).build();


    }

    @CrossOrigin(origins = "*")
    @PostMapping("/subcategory/add")
    public ResponseEntity<Object> createSubCategory(@RequestBody AdminTestSubCategories adminTestSubCategories)
    {
       AdminTestSubCategories adminTestSubCategories_saved =  adminTestSubCategoriesService.save(adminTestSubCategories);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSubCategories_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/testseriesdata/{offset}/{data_limit}")
    public Iterable<AdminTestCategoriesDto> testSeriesCategoriesData(@PathVariable int offset,@PathVariable  int data_limit)
    {
        return adminTestSeriesCategoryService.AdminTestSeriesData(offset,data_limit);
    }

}
