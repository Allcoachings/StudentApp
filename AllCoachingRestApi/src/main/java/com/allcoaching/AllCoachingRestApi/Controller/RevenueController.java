package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Service.RevenueService;
import com.allcoaching.AllCoachingRestApi.dto.SalesOverViewDataDto;
import com.allcoaching.AllCoachingRestApi.dto.SalesWithRevenueOverView;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/revenue/")
@Api()
public class RevenueController {


    @Autowired
    private RevenueService revenueService;


    @CrossOrigin(origins = "*")
    @GetMapping("/getSalesOverview/{insId}")
    public SalesWithRevenueOverView getSalesOverview(@PathVariable long insId)
    {
        return revenueService.getSalesOverview(insId);
    }
}
