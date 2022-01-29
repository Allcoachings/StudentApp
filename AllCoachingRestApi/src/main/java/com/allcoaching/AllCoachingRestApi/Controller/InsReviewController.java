package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.InsReviewService;
import com.allcoaching.AllCoachingRestApi.dto.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/course/reviews")
@Api(value="student", description = "For Student to review institute")
public class InsReviewController {

    @Autowired
    private InsReviewService insReviewService;

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody InsReview insReview)
    {
        InsReview insReview_saved = insReviewService.save(insReview);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("{id}")
                .buildAndExpand(insReview_saved.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/")
    public ResponseEntity<Object> updateReview(@RequestBody InsReview insReview)
    {
        int rowCount= insReviewService.setReply(insReview);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/add/")
    public @ResponseBody InsReview addReview(@RequestBody InsReview insReview)
    {
        return  insReviewService.addReview(insReview);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{offset}/{data_limit}/{sortBy}/{insId}")
    public Iterable<InsReviewDto> getAllReviews(
            @PathVariable(name = "offset") Integer offset,
            @PathVariable(name = "data_limit") Integer data_limit,
            @PathVariable(name = "sortBy") String sortBy,
            @PathVariable(name="insId")long insId)
    {
        return  insReviewService.getAllReviews(offset,data_limit,sortBy,insId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{insId}/{studentId}")
    public Optional<InsReview> findByInsIdStudentId(
            @PathVariable(name = "insId") long insId,
            @PathVariable(name = "studentId") long studentId)
    {
        return  insReviewService.findByInsIdStudentId(insId, studentId);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("enrollcheck/{courseId}/{studentId}")
    public boolean findByCourseIdStudentId(
            @PathVariable(name = "courseId") long courseId,
            @PathVariable(name = "studentId") long studentId)
    {
        return  insReviewService.findByCourseIdStudentId(courseId, studentId);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/purchaseList/{studentId}/{offset}/{dataLimit}")
    public Iterable<StudentPurchaseDto> findByStudentId(
            @PathVariable(name = "studentId") long studentId,
            @PathVariable(name = "offset") int offset,
            @PathVariable(name = "dataLimit") int dataLimit)
    {
        return  insReviewService.findByStudentId(studentId,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/updateReview/")
    public ResponseEntity<Object> updateReviewById(@RequestBody InsReview insReview)
    {
         insReviewService.updateReviewById(insReview);
        return ResponseEntity.ok().build();
    }

    //count reviews by courseId
    @CrossOrigin(origins = "*")
    @GetMapping("count/course/{courseId}")
    public long countByCourseId(@PathVariable long courseId)
    {
        return insReviewService.countCourseReviews(courseId);
    }

    //count reviews by insId
    @CrossOrigin(origins = "*")
    @GetMapping("count/ins/{insId}")
    public long countByInsId(@PathVariable long insId)
    {
        return insReviewService.countInstituteReviews(insId);
    }
    //getting graph data for institute Revenues based on mode
    //i.e. weekly , monthly
    @ApiOperation(value = "getting graph data for institute Revenues based on mode i.e. weekly , monthly")
    @CrossOrigin()
    @GetMapping("/course/Revenue/graphdata/{mode}/{insId}/{dataTime}")
    public  Iterable<Graph2dDataDto> getRevenueGraphData(@PathVariable  String mode, @PathVariable long insId, @PathVariable int dataTime)
    {
        switch (mode)
        {
            case "weekly":
                return insReviewService.getGraphDataWeekly(insId,dataTime);

            case "monthly":
                return insReviewService.getGraphDataMontly(insId,dataTime);

            case "yearly":
                return  insReviewService.getGraphDataYearly(insId,dataTime);

            default:
                return new ArrayList<>();
        }
    }
    @ApiOperation(value = "getting graph data for admin based on mode i.e. weekly , monthly Revenues of institute")
    @CrossOrigin()
    @GetMapping("/course/admin/Revenue/graphdata/{mode}/{dataTime}")
    public  Iterable<Graph2dDataDto> adminRevenueGraphData(@PathVariable  String mode,@PathVariable int dataTime)
    {
        switch (mode)
        {
            case "weekly":
                return insReviewService.adminRevenueGraphDataWeekly( dataTime);

            case "monthly":
                return insReviewService.adminRevenueGraphDataMonthly( dataTime);

            case "yearly":
                return  insReviewService.adminRevenueGraphDataYearly( dataTime);

            default:
                return new ArrayList<>();
        }
    }


    @ApiOperation(value = "getting category wise revenue   for today and total")
    @CrossOrigin()
    @GetMapping("/course/admin/Revenue/categorywise")
    public  Iterable<CategoryRevenueDto> categoryWiseRevenue()
    {
         return insReviewService.categoryWiseRevenue();
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/course/admin/Revenue/ins/categorywise/{catId}")
    public  Iterable<InstituteRevenueDto> InscategoryWiseRevenue(@PathVariable long catId)
    {
        return insReviewService.instituteRevenueOverviewCategoryWise(catId);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/course/admin/Revenue/inscourse/{insId}")
    public  Iterable<CourseRevenueDto> instituteCourseRevenueOverviewCategoryWise(@PathVariable long insId)
    {
        return insReviewService.instituteCourseRevenueOverviewCategoryWise(insId);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/course/admin/Revenue/count")
    public  RevenueCountDto revenueCount()
    {
        return insReviewService.revenueCount();
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/course/admin/Revenue/count/ins/{insId}")
    public  RevenueCountDto revenueCountIns(@PathVariable long insId)
    {
        return insReviewService.revenueCountIns(insId);
    }

}
