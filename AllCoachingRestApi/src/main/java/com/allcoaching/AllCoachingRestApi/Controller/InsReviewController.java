package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.InsReviewService;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import com.allcoaching.AllCoachingRestApi.dto.StudentPurchaseDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
    public ResponseEntity<Object> addReview(@RequestBody InsReview insReview)
    {
        int rowCount= insReviewService.addReview(insReview);
        return ResponseEntity.ok().build();
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
    @GetMapping("/{courseId}/{studentId}")
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

}
