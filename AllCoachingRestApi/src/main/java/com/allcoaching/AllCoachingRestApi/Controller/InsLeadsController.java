package com.allcoaching.AllCoachingRestApi.Controller;


import com.allcoaching.AllCoachingRestApi.Entity.InsLeads;
import com.allcoaching.AllCoachingRestApi.Respository.InsLeadsRepo;
import com.allcoaching.AllCoachingRestApi.Service.InsLeadService;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/institute/leads")
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
}
