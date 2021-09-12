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

    @Query("Select p from Payouts p where  p.payoutTime>=CURRENT_DATE and institute=?1" )
    Page<Payouts> todaysPayoutIns(Institute institute,Pageable pageable);

    @Query("Select p from Payouts p where  month(p.payoutTime)=month(CURRENT_DATE) and institute=?1" )
    Page<Payouts> currentMonthPayoutIns(Institute institute,Pageable pageable);


    @Query("Select p from Payouts p where  p.payoutTime>=CURRENT_DATE" )
    Page<Payouts> todaysPayout(Pageable pageable);

    @Query("Select p from Payouts p where  month(p.payoutTime)=month(CURRENT_DATE)" )
    Page<Payouts> currentMonthPayout(Pageable pageable);

    @Query("Select count(p.id)  from Payouts p where p.payoutTime>=CURRENT_DATE")
    long todaysTotalPayouts();

    @Query("Select sum(p.amount)  from Payouts p where p.payoutTime>=CURRENT_DATE")
    long todaysPayoutsSum();

    @Query("Select count(p.id)  from Payouts p where month(p.payoutTime)=month(CURRENT_DATE)")
    long currentMonthTotalPayouts();

    @Query("Select sum(p.amount)  from Payouts p where month(p.payoutTime)=month(CURRENT_DATE)")
    long currentMonthPayoutsSum();

    @Query("Select count(p.id)  from Payouts p ")
    long totalPayouts();

    @Query("Select sum(p.amount)  from Payouts p ")
    long payoutsSum();

    @Query("Select count(p.id)  from Payouts p where p.payoutTime>=CURRENT_DATE and institute=?1")
    long todaysTotalPayoutsIns(Institute institute);

    @Query("Select sum(p.amount)  from Payouts p where p.payoutTime>=CURRENT_DATE and institute=?1")
    long todaysPayoutsSumIns(Institute institute);

    @Query("Select count(p.id)  from Payouts p where month(p.payoutTime)=month(CURRENT_DATE) and institute=?1")
    long currentMonthTotalPayouts(Institute institute);

    @Query("Select sum(p.amount)  from Payouts p where month(p.payoutTime)=month(CURRENT_DATE) and institute=?1")
    long currentMonthPayoutsSumIns(Institute institute);

    @Query("Select count(p.id)  from Payouts p where   institute=?1")
    long totalPayoutsIns(Institute institute);

    @Query("Select sum(p.amount)  from Payouts p where institute=?1")
    long payoutsSumIns(Institute institute);

    @Query("Select sum(p.amount) from Payouts p where p.institute=:ins")
    long payoutSumForIns(Institute ins);

    @Query("Select sum(p.amount) from Payouts p where p.institute=:ins and p.payoutTime>=CURRENT_DATE")
    long payoutSumForInsCurrentDate(Institute ins);
}
