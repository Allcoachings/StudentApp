package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Service.CategoryAnalyticsService;
import com.allcoaching.AllCoachingRestApi.dto.CategoryWisePurchaseDataDto;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/analytics/category")
@Api()
public class CategoryAnalyticsController {

    @Autowired
    private CategoryAnalyticsService categoryAnalyticsService;

    @CrossOrigin(origins = "*")
    @GetMapping("/{categoryId}/{offset}/{dataLimit}")
    public Iterable<CategoryWisePurchaseDataDto> findEnrolledStudentsByCategoryId(@PathVariable long categoryId,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return  categoryAnalyticsService.getStudentByCategory(categoryId,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/studentCount")
    public Iterable<Graph2dDataDto> studentCountCategoryWise()
    {
        return  categoryAnalyticsService.studentCountCategoryWise();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/insCount")
    public Iterable<Graph2dDataDto> insCountCategoryWise()
    {
        return  categoryAnalyticsService.insCountCategoryWise();
    }

}
