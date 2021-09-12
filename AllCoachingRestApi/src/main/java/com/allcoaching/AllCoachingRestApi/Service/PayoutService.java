package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Payouts;
import com.allcoaching.AllCoachingRestApi.Respository.PayoutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class PayoutService {

    @Autowired
    private PayoutRepo payoutRepo;

    public Payouts addPayout(Payouts payouts)
    {
        return payoutRepo.save(payouts);
    }

    public Iterable<Payouts> findByInstitute(Institute institute,int page,int pageSize)
    {

        Page<Payouts> paged_result = payoutRepo.findByInstitute(institute, PageRequest.of( page,pageSize, Sort.by(Sort.Direction.DESC,"payoutTime")));
        if(paged_result.hasContent())
        {

            return paged_result.getContent();
        }

        return new ArrayList<>();
    }

    public long totalPayout(Institute institute)
    {
        return  payoutRepo.payoutSumForIns(institute);
    }
    public long totalPayoutCurrentDate(Institute institute)
    {
        return  payoutRepo.payoutSumForInsCurrentDate(institute);
    }

    public void deletePayoutById(long id)
    {
        payoutRepo.deleteById(id);
    }

    //all payouts of allcoaching
    public Iterable<Payouts> findAllPayouts(int page,int pageSize)
    {
         return  extractDataFromPage(payoutRepo.findAll(PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"payoutTime"))));

    }
    //all todays payouts
    public Iterable<Payouts> todaysPayouts(int offset,int pageSize)
    {
        return extractDataFromPage(payoutRepo.todaysPayout(PageRequest.of(offset,pageSize,Sort.by(Sort.Direction.DESC,"payoutTime"))));
    }

    //all current month payouts
    public Iterable<Payouts> currentMonthPayouts(int offset,int pageSize)
    {
        return extractDataFromPage(payoutRepo.currentMonthPayout(PageRequest.of(offset,pageSize,Sort.by(Sort.Direction.DESC,"payoutTime"))));
    }

    //all todays payouts ins
    public Iterable<Payouts> todaysPayoutsIns(Institute institute,int offset,int pageSize)
    {
        return extractDataFromPage(payoutRepo.todaysPayoutIns(institute,PageRequest.of(offset,pageSize,Sort.by(Sort.Direction.DESC,"payoutTime"))));
    }

    //all current month payouts ins
    public Iterable<Payouts> currentMonthPayoutsIns(Institute institute,int offset,int pageSize)
    {
        return extractDataFromPage(payoutRepo.currentMonthPayoutIns(institute,PageRequest.of(offset,pageSize,Sort.by(Sort.Direction.DESC,"payoutTime"))));
    }

    public  long todaysTotalPayout()
    {
        return payoutRepo.todaysTotalPayouts();
    }

    public  long todaysPayoutsSum()
    {
        return payoutRepo.todaysPayoutsSum();
    }

    public  long currentMonthTotalPayouts()
    {
        return payoutRepo.currentMonthTotalPayouts();
    }

    public  long currentMonthPayoutsSum()
    {
        return payoutRepo.currentMonthPayoutsSum();

    }

    public  long totalPayouts()
    {
        return payoutRepo.totalPayouts();

    }
    public  long payoutsSum()
    {
        return payoutRepo.payoutsSum();

    }

    public  long todaysTotalPayoutsIns(Institute institute)
    {
        return payoutRepo.todaysTotalPayoutsIns(institute);

    }

    public  long todaysPayoutsSumIns(Institute institute)
    {
        return payoutRepo.todaysPayoutsSumIns(institute);

    }

    public  long currentMonthTotalPayouts(Institute institute)
    {
        return payoutRepo.currentMonthTotalPayouts(institute);

    }
    public  long currentMonthPayoutsSumIns(Institute institute)
    {
        return payoutRepo.currentMonthPayoutsSumIns(institute);

    }
    public  long totalPayoutsIns(Institute institute)
    {
        return payoutRepo.totalPayoutsIns(institute);

    }

    public  long payoutsSumIns(Institute institute)
    {
        return payoutRepo.payoutsSumIns(institute);

    }

    public  Iterable extractDataFromPage(Page page)
    {
        if(page.hasContent())
        {
            return page.getContent();
        }
        return new ArrayList<>();
    }
}
