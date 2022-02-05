package com.allcoaching.AllCoachingRestApi.Controller;
import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
import com.allcoaching.AllCoachingRestApi.Service.FeedReportService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/feedReport")
@Api()
public class FeedReportController {

    @Autowired
    private FeedReportService feedReportService;

    @CrossOrigin(origins = "*")
    @PostMapping("/report")
    public ResponseEntity<Object> addFeedReport(@RequestBody FeedReport feedReport)
    {
        FeedReport feedReport_saved = feedReportService.addReport(feedReport);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(feedReport_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getReports/{page}/{pageSize}")
    public Iterable<FeedReport> getFeedReport(@PathVariable int page,@PathVariable int pageSize)
    {
        return  feedReportService.getFeedReports(page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("UnSeenFeedReportCount")
    public long UnSeenFeedReportCount()
    {
        return feedReportService.getFeedReportsUnseenCount();

    }


    @CrossOrigin(origins = "*")
    @PutMapping("updateFeedReportSeenStatus")
    public ResponseEntity<Object> updateTransactionSeenStatus(@RequestParam(name = "reportId") long reportId,@RequestParam(name = "status") boolean status)
    {
        feedReportService.updateReportStatus(reportId,status);
        return ResponseEntity.ok().build();

    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("deleteById/{id}")
    public ResponseEntity<Object>  deleteById(@PathVariable(name="id") long id)
    {
        feedReportService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("deleteByFeedId/{id}")
    public ResponseEntity<Object>  deleteByFeedId(@PathVariable(name="id") long id)
    {
        feedReportService.deleteByFeedId(id);
        return ResponseEntity.ok().build();
    }
}
