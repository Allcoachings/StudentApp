package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Service.*;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @Autowired
    private FileUploadService fileUploadService;
    @CrossOrigin(origins = "*")
    @PostMapping("/addCategory")
    public ResponseEntity<Object> createTestSeriseCategory(@RequestParam MultipartFile file,@RequestParam String name,@RequestParam int sortOrder)
    {
        String image = "files/";
        image += fileUploadService.storeFile(file);
        AdminTestSeriesCategory adminTestSeriesCategory_saved =  adminTestSeriesCategoryService.save(new AdminTestSeriesCategory(name,image,sortOrder));
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSeriesCategory_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();


    }

    @CrossOrigin(origins = "*")
    @PostMapping("/subcategory/add")
    public ResponseEntity<Object> createSubCategory(@RequestParam MultipartFile file,@RequestParam String name,@RequestParam int sortOrder,@RequestParam long categoryId)
    {
        String image = "files/";
        image += fileUploadService.storeFile(file);
       AdminTestSubCategories adminTestSubCategories_saved =  adminTestSubCategoriesService.save(new AdminTestSubCategories(name,image,sortOrder,categoryId));
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSubCategories_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/testseriesdata/{offset}/{data_limit}")
    public Iterable<AdminTestCategoriesDto> testSeriesCategoriesData(@PathVariable int offset,@PathVariable  int data_limit)
    {
        return adminTestSeriesCategoryService.AdminTestSeriesData(offset,data_limit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("testSubCategoryByCategoryId/{id}/{offset}/{pageSize}")
    public Iterable<AdminTestSubCategories> testSubCategoriesByCategoryId(@PathVariable long id,@PathVariable int offset,@PathVariable int pageSize)
    {
        return  adminTestSubCategoriesService.findByCategoryPagedResult(id,offset,pageSize);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/subcategory/content/add")
    public ResponseEntity<Object> addSubCategoryContent(@RequestParam MultipartFile file,@RequestParam String name,@RequestParam int sortOrder,@RequestParam long subcategoryId)
    {
        String image="files/";
        image += fileUploadService.storeFile(file);
        AdminTestSeriesSubCategoryContent adminTestSeriesSubCategoryContent_saved = adminTestSeriesSubCategoryContentService.addSubCategoryItem(new AdminTestSeriesSubCategoryContent(name,image,sortOrder,subcategoryId));
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminTestSeriesSubCategoryContent_saved.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return  ResponseEntity.created(location).headers(headers).build();
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

    @CrossOrigin(origins = "*")
    @DeleteMapping("/category/delete/{id}")
    public ResponseEntity<Object> deleteId(@PathVariable long id)
    {
           adminTestSeriesCategoryService.delete(id);
           return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/subCategory/delete/{id}")
    public ResponseEntity<Object> deleteSubCategoryById(@PathVariable long id)
    {
           adminTestSubCategoriesService.delete(id);
           return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/subCategoryContent/delete/{id}")
    public ResponseEntity<Object> deleteSubCategoryContentById(@PathVariable long id)
    {
           adminTestSeriesSubCategoryContentService.deleteById(id);
           return ResponseEntity.ok().build();
    }




}
