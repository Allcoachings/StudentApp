package com.allcoaching.AllCoachingRestApi.Controller;
import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
import com.allcoaching.AllCoachingRestApi.Service.FeedReportService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/feedReport")
@Api()
public class FeedReportController {

    @Autowired
    private FeedReportService feedReportService;

    @PostMapping("/report")
    public ResponseEntity<Object> addFeedReport(@RequestBody FeedReport feedReport)
    {
        FeedReport feedReport_saved = feedReportService.addReport(feedReport);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(feedReport_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
