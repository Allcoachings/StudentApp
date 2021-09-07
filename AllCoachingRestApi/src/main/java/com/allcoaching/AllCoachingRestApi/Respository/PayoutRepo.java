package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Payouts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayoutRepo extends PagingAndSortingRepository<Payouts,Long> {

    Page<Payouts> findByInstitute(Institute id, Pageable pageable);


    @Query("Select sum(p.amount) from Payouts p where p.institute=:ins")
    long payoutSumForIns(Institute ins);

    @Query("Select sum(p.amount) from Payouts p where p.institute=:ins and p.payoutTime>=CURRENT_DATE")
    long payoutSumForInsCurrentDate(Institute ins);
}
