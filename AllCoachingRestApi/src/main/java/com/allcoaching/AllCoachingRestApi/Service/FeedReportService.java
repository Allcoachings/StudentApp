package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
import com.allcoaching.AllCoachingRestApi.Respository.ReportFeedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedReportService {

    @Autowired
    private ReportFeedRepo reportFeedRepo;


    public FeedReport addReport(FeedReport feedReport)
    {
        return reportFeedRepo.save(feedReport);
    }
}
