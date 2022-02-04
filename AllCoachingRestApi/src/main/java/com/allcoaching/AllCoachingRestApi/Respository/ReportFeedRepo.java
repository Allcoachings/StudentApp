package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.FeedReport;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ReportFeedRepo extends PagingAndSortingRepository<FeedReport,Long> {


    long countByIsSeenByAdmin(boolean isSeenByAdmin);

    @Modifying
    @Query("UPDATE FeedReport fr set fr.isSeenByAdmin = :status where fr.id=:id")
    void updateReportStatus(long id,boolean status);
}
