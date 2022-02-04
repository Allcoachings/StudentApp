package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
import com.allcoaching.AllCoachingRestApi.Respository.ReportFeedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FeedReportService {

    @Autowired
    private ReportFeedRepo reportFeedRepo;


    public FeedReport addReport(FeedReport feedReport)
    {
        return reportFeedRepo.save(feedReport);
    }
    public Iterable<FeedReport> getFeedReports(int page,int pageSize)
    {
        Page<FeedReport> pagedResult = reportFeedRepo.findAll(PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"reportDate"))) ;
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    public void updateReportStatus(long reportId,boolean status)
    {
        reportFeedRepo.updateReportStatus(reportId,status);
    }

    public long getFeedReportsUnseenCount()
    {
        return  reportFeedRepo.countByIsSeenByAdmin(true);

    }
}
