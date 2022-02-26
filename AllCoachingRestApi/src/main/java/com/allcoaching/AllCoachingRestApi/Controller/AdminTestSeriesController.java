package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.*;
import com.allcoaching.AllCoachingRestApi.Service.*;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto;
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
    @GetMapping("/fetchAllTestSeriesCategories")
    public Iterable<AdminTestSeriesCategory>  findAll()
    {
        return adminTestSeriesCategoryService.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addCategory")
    public @ResponseBody AdminTestSeriesCategory createTestSeriesCategory(@RequestParam String name,@RequestParam int sortOrder)
    {


        return adminTestSeriesCategoryService.save(new AdminTestSeriesCategory(name,sortOrder));


    }
    @CrossOrigin(origins = "*")
    @PutMapping("/editCategory")
    public @ResponseBody AdminTestSeriesCategory editTestSeriesCategory(@RequestBody AdminTestSeriesCategory adminTestSeriesCategory)
    {

        return adminTestSeriesCategoryService.save(adminTestSeriesCategory);


    }

    @CrossOrigin(origins = "*")
    @PostMapping("/subcategory/add")
    public @ResponseBody AdminTestSubCategories createSubCategory(@RequestParam MultipartFile file,@RequestParam String name,@RequestParam int sortOrder,@RequestParam long categoryId)
    {
        String image = "files/";
        image += fileUploadService.storeFile(file);
        return   adminTestSubCategoriesService.save(new AdminTestSubCategories(name,image,sortOrder,categoryId));


    }
    @CrossOrigin(origins = "*")
    @PutMapping("/subcategory/edit")
    public @ResponseBody AdminTestSubCategories editTestSubCategory(@RequestBody AdminTestSubCategories adminTestSubCategories)
    {

        return adminTestSubCategoriesService.save(adminTestSubCategories);


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
    public @ResponseBody AdminTestSeriesSubCategoryContent addSubCategoryContent(@RequestParam MultipartFile file,@RequestParam String name,@RequestParam int sortOrder,@RequestParam long subcategoryId)
    {
        String image="files/";
        image += fileUploadService.storeFile(file);
        return adminTestSeriesSubCategoryContentService.addSubCategoryItem(new AdminTestSeriesSubCategoryContent(name,image,sortOrder,subcategoryId));
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/subcategory/content/edit")
    public @ResponseBody AdminTestSeriesSubCategoryContent  editTestSubCategoryContent(@RequestBody AdminTestSeriesSubCategoryContent adminTestSeriesSubCategoryContent)
    {

        return adminTestSeriesSubCategoryContentService.addSubCategoryItem(adminTestSeriesSubCategoryContent);


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
    @GetMapping("/subcategory/content/testseries/forUser/{userId}/{offset}/{dataLimit}/{subId}")
    public Iterable<TestSeriesAndUserResponseDto> fetchAllTestSeriesOfASubCategoryContentForUser(@PathVariable long userId, @PathVariable int offset, @PathVariable int dataLimit, @PathVariable long subId)
    {
        return insTestSeriesService.findByCategoryAndIsAdminForUser(userId,subId,offset,dataLimit);
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
