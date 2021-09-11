package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import com.allcoaching.AllCoachingRestApi.Service.SearchService;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
@Api(value = "search",description = "Search controller for Student")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @CrossOrigin(origins = "*")
    @GetMapping("/ins/{searchword}/{offset}/{dataLimit}")
    public   Iterable<Institute> searchInsitute(@PathVariable String searchword, @PathVariable int offset,@PathVariable int dataLimit)
    {
        return searchService.searchInstitute(searchword,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/ins/searchbyemail/{searchword}/{offset}/{dataLimit}")
    public   Iterable<Institute> searchInstituteByEmail(@PathVariable String searchword, @PathVariable int offset,@PathVariable int dataLimit)
    {
        return searchService.searchInstituteByEmail(searchword,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/student/searchbyemail/{searchword}/{offset}/{dataLimit}")
    public   Iterable<Student> searchStudentByEmail(@PathVariable String searchword, @PathVariable int offset,@PathVariable int dataLimit)
    {
        return searchService.searchStudentByEmail(searchword,offset,dataLimit);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/student/{searchword}/{offset}/{dataLimit}")
    public   Iterable<Student> searchStudent(@PathVariable String searchword, @PathVariable int offset, @PathVariable int dataLimit)
    {
        return searchService.searchStudent(searchword,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/testSeries/{searchword}/{offset}/{dataLimit}")
    public   Iterable<AdminTestCategoriesDto> searchTestSeries(@PathVariable String searchword, @PathVariable int offset, @PathVariable int dataLimit)
    {
        return searchService.searchTestSeries(searchword,offset,dataLimit);
    }

}
