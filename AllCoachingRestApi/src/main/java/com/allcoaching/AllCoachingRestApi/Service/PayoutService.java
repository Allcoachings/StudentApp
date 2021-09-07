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


}
