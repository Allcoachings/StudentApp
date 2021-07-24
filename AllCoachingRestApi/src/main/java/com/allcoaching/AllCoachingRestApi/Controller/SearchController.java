package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import com.allcoaching.AllCoachingRestApi.Service.SearchService;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @CrossOrigin(origins = "*")
    @GetMapping("/ins/{searchword}/{offset}/{dataLimit}")
    public   Iterable<Institute> searchInsitute(@PathVariable String searchword, @PathVariable int offset,@PathVariable int dataLimit)
    {
        return searchService.searchInstitute(searchword,offset,dataLimit);
    }


//    @CrossOrigin(origins = "*")
//    @GetMapping("/testSeries/{searchword}/{offset}/{dataLimit}")
//    public   Iterable<AdminTestCategoriesDto> seacrhTestSeries(@PathVariable String searchword, @PathVariable int offset, @PathVariable int dataLimit)
//    {
//        return searchService.searchTestSeries(searchword,offset,dataLimit);
//    }

}
