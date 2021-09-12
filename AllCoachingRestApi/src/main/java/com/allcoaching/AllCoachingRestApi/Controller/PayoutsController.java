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
    public @ResponseBody Payouts savePayout(@RequestBody Payouts payouts)
    {
        return payoutService.addPayout(payouts);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object> deletePayout(@PathVariable long id)
    {
        payoutService.deletePayoutById(id);
        return ResponseEntity.ok().build();
    }


    @CrossOrigin(origins="*")
    @PostMapping("/byIns/{page}/{pageSize}")
    public  Iterable<Payouts> InstitutePayouts(@RequestBody Institute institute,@PathVariable int page,@PathVariable int pageSize)
    {
            return payoutService.findByInstitute(institute,page,pageSize);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("all/{offset}/{dataLimit}")
    public Iterable<Payouts> fetchAllPayouts(@PathVariable int offset,@PathVariable int dataLimit)
    {
        return payoutService.findAllPayouts(offset,dataLimit);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("today/all/{offset}/{dataLimit}")
    public Iterable<Payouts> todaysPayouts(@PathVariable int offset,@PathVariable int dataLimit)
    {
        return payoutService.todaysPayouts(offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("month/all/{offset}/{dataLimit}")
    public Iterable<Payouts> currentMonthPayouts(@PathVariable int offset,@PathVariable int dataLimit)
    {
        return payoutService.currentMonthPayouts(offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("today/ins/{offset}/{dataLimit}")
    public Iterable<Payouts> todayPayoutsIns(@RequestBody Institute institute,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return payoutService.todaysPayoutsIns(institute,offset,dataLimit);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("month/ins/{offset}/{dataLimit}")
    public Iterable<Payouts> currentMonthPayoutsIns(@RequestBody Institute institute,@PathVariable int offset,@PathVariable int dataLimit)
    {
        return payoutService.currentMonthPayoutsIns(institute,offset,dataLimit);
    }



    @CrossOrigin(origins="*")
    @GetMapping("/today/total/count")
    public  long todaysTotalPayout()
    {
        return payoutService.todaysTotalPayout();
    }

    @CrossOrigin(origins="*")
    @GetMapping("/today/total/sum")
    public  long todaysPayoutsSum()
    {
        return payoutService.todaysPayoutsSum();

    }

    @CrossOrigin(origins="*")
    @GetMapping("/month/total/count")
    public  long monthPayoutsSum()
    {
        return payoutService.currentMonthTotalPayouts();

    }

    @CrossOrigin(origins="*")
    @GetMapping("/month/total/sum")
    public  long currentMonthPayoutsSum()
    {
        return payoutService.currentMonthPayoutsSum();

    }

    @CrossOrigin(origins="*")
    @GetMapping("/total/count")
    public  long totalPayouts()
    {
        return payoutService.totalPayouts();

    }

    @CrossOrigin(origins="*")
    @GetMapping("/total/sum")
    public  long payoutsSum()
    {
        return payoutService.payoutsSum();

    }

    @CrossOrigin(origins="*")
    @PostMapping("today/total/ins/Count")
    public  long todaysTotalPayoutsIns(@RequestBody Institute institute)
    {
        return payoutService.todaysTotalPayoutsIns(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("today/total/ins/sum")
    public  long todaysPayoutsSumIns(@RequestBody Institute institute)
    {
        return payoutService.todaysPayoutsSumIns(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("month/total/ins/count")
    public  long currentMonthTotalPayouts(@RequestBody Institute institute)
    {
        return payoutService.currentMonthTotalPayouts(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("month/total/ins/sum")
    public  long currentMonthPayoutsSumIns(@RequestBody Institute institute)
    {
        return payoutService.currentMonthPayoutsSumIns(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("total/ins/count")
    public  long totalPayoutsIns(@RequestBody Institute institute)
    {
        return payoutService.totalPayoutsIns(institute);
    }

    @CrossOrigin(origins="*")
    @PostMapping("total/ins/sum")
    public  long payoutsSumIns(@RequestBody Institute institute)
    {
        return payoutService.payoutsSumIns(institute);
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
