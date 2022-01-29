package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.QuestionReport;
import com.allcoaching.AllCoachingRestApi.Respository.QuestionReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionReportService {
    @Autowired
    private QuestionReportRepo questionReportRepo;

    public QuestionReport createQestionReport(QuestionReport questionReport)
    {
        return questionReportRepo.save(questionReport);
    }

}
