package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.InsReviewService;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/institute/course/reviews")
public class InsReviewController {

    @Autowired
    private InsReviewService insReviewService;

    @PostMapping("/")
    public ResponseEntity<Object> saveReview(@RequestBody InsReview insReview)
    {
        InsReview insReview_saved = insReviewService.save(insReview);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(insReview_saved.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/")
    public ResponseEntity<Object> updateReview(@RequestBody InsReview insReview)
    {
        int rowCount= insReviewService.setReply(insReview);


        return ResponseEntity.ok().build();
    }

    @GetMapping("/{offset}/{data_limit}/{sortBy}/{insId}")
    public Iterable<InsReviewDto> getAllReviews(
            @PathVariable(name = "offset") Integer offset,
            @PathVariable(name = "data_limit") Integer data_limit,
            @PathVariable(name = "sortBy") String sortBy,
            @PathVariable(name="insId")long insId)
    {
        return  insReviewService.getAllReviews(offset,data_limit,sortBy,insId);
    }
}
