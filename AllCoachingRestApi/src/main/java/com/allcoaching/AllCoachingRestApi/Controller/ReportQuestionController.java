package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.QuestionReport;
import com.allcoaching.AllCoachingRestApi.Service.QuestionReportService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/question/")
@Api()
public class ReportQuestionController {

    @Autowired
    QuestionReportService questionReportService;
    @PostMapping("/reportQuestion")
    public ResponseEntity<Object> createQuestionReport(@RequestBody QuestionReport questionReport)
    {
        QuestionReport questionReport_saved = questionReportService.createQestionReport(questionReport);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(questionReport_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
