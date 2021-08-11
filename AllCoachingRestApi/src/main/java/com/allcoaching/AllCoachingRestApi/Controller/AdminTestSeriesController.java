package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Service.AdminTestSeriesCategoryService;
import com.allcoaching.AllCoachingRestApi.Service.AdminTestSeriesSubCategoryContentService;
import com.allcoaching.AllCoachingRestApi.Service.AdminTestSubCategoriesService;
import com.allcoaching.AllCoachingRestApi.Service.InsTestSeriesService;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/v1/admintestseries")
@Api()
public class AdminTestSeriesController {

    @Autowired
    private AdminTestSeriesCategoryService adminTestSeriesCategoryService;

    @Autowired
    private AdminTestSubCategoriesService adminTestSubCategoriesService;

    @Autowired
    private AdminTestSeriesSubCategoryContentService adminTestSeriesSubCategoryContentService;

    @Autowired
    private InsTestSeriesService insTestSeriesService;

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

    @CrossOrigin(origins = "*")
    @PostMapping("/subcategory/content/add")
    public ResponseEntity<Object> addSubCategoryContent(@RequestBody AdminTestSeriesSubCategoryContent adminTestSeriesSubCategoryContent)
    {
        AdminTestSeriesSubCategoryContent adminTestSeriesSubCategoryContent_saved = adminTestSeriesSubCategoryContentService.addSubCategoryItem(adminTestSeriesSubCategoryContent);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSeriesSubCategoryContent_saved.getId()).toUri();
        return  ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/subcategory/content/bysubcategory/{offset}/{dataLimit}/{subId}")
    public Iterable<AdminTestSeriesSubCategoryContent> adminTestSeriesSubCategoryContents(@PathVariable int offset,
                                                                                          @PathVariable int dataLimit,
                                                                                          @PathVariable long subId
                                                                                          )
    {
        return adminTestSeriesSubCategoryContentService.findAllContentBySubCategory(offset,dataLimit,subId);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/subcategory/content/testseries/{offset}/{dataLimit}/{subId}")
    public Iterable<InsTestSeries> fetchAllTestSeriesOfASubCategoryContent(@PathVariable int offset,@PathVariable int dataLimit,@PathVariable long subId)
    {
        return insTestSeriesService.findByCategoryAndIsAdmin(subId,offset,dataLimit);
    }



}
