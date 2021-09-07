package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Payouts;
import com.allcoaching.AllCoachingRestApi.Service.PayoutService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/payouts")
@Api()
public class PayoutsController {

    @Autowired
    private PayoutService payoutService;

    @CrossOrigin(origins = "*")
    @PostMapping("/add")
    public ResponseEntity<Object> savePayout(@RequestBody Payouts payouts)
    {
        Payouts payouts_saved =  payoutService.addPayout(payouts);
        URI location  = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(payouts_saved.getId()).toUri();
        return  ResponseEntity.created(location).build();
    }


    @CrossOrigin(origins="*")
    @PostMapping("/byIns/{page}/{pageSize}")
    public  Iterable<Payouts> InstitutePayouts(@RequestBody Institute institute,@PathVariable int page,@PathVariable int pageSize)
    {
            return payoutService.findByInstitute(institute,page,pageSize);
    }



    @CrossOrigin(origins="*")
    @PostMapping("/byIns/total")
    public  long InstitutePayoutsSum(@RequestBody Institute institute)
    {
        return payoutService.totalPayout(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("/byIns/todaysTotal")
    public  long InstitutePayoutsSumToday(@RequestBody Institute institute)
    {
        return payoutService.totalPayoutCurrentDate(institute);
    }

}
