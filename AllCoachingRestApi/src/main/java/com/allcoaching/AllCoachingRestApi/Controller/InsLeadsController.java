package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.InsLeads;
import com.allcoaching.AllCoachingRestApi.Respository.InsLeadsRepo;
import com.allcoaching.AllCoachingRestApi.Service.InsLeadService;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/institute/leads")
@Api(value = "student" ,description = "institute leads controller")
public class InsLeadsController {
    @Autowired
    private InsLeadService insLeadService;

    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<Object> addLead(@RequestBody InsLeads insLeads)
    {
        InsLeads insLeads_saved = insLeadService.addLead(insLeads);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(insLeads_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{insId}/{offset}/{dataLimit}")
    public  Iterable<InsLeadsDto> fetchInsLeadsInfo(@PathVariable long insId,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return insLeadService.InsLeadsInfo(insId,offset,dataLimit);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/leadcount/{insId}")
    public  long countLeadsOfInstitute(@PathVariable long insId)
    {
        return insLeadService.countLeadsOf(insId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/course/{courseId}/{offset}/{dataLimit}")
    public  Iterable<InsLeadsStudentDto> fetchInsCourseLeadsInfo(@PathVariable long courseId, @PathVariable int offset, @PathVariable int dataLimit)
    {
        return insLeadService.InsCourseLeadList(courseId,offset,dataLimit);
    }

    //getting graph data for institute leads based on mode
    //i.e. weekly , monthly
    @ApiOperation(value = "getting graph data for institute leads based on mode i.e. weekly , monthly")
    @CrossOrigin()
    @GetMapping("/course/lead/graphdata/{mode}/{insId}/{dataTime}")
    public  Iterable<Graph2dDataDto> getLeadGraphData(@PathVariable  String mode,@PathVariable long insId,@PathVariable int dataTime)
    {
        switch (mode)
        {
            case "weekly":
               return insLeadService.getGraphDataWeekly(insId,dataTime);

            case "monthly":
                return insLeadService.getGraphDataMontly(insId,dataTime);

            case "yearly":
                return  insLeadService.getGraphDataYearly(insId,dataTime);

            default:
                return new ArrayList<>();
        }
    }
    @ApiOperation(value = "getting graph data for admin based on mode i.e. weekly , monthly leads of institute")
    @CrossOrigin()
    @GetMapping("/course/admin/lead/graphdata/{mode}/{dataTime}")
    public  Iterable<Graph2dDataDto> adminLeadGraphData(@PathVariable  String mode,@PathVariable int dataTime)
    {
        switch (mode)
        {
            case "weekly":
               return insLeadService.adminLeadGraphDataWeekly( dataTime);

            case "monthly":
                return insLeadService.adminLeadGraphDataMonthly( dataTime);

            case "yearly":
                return  insLeadService.adminLeadGraphDataYearly( dataTime);

            default:
                return new ArrayList<>();
        }
    }



}
