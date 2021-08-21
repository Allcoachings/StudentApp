package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface InsTestSeriesRepo extends PagingAndSortingRepository<InsTestSeries,Long> {
    Iterable<InsTestSeries> findByCourseIdAndIsAdmin(long id,boolean isAdmin);
    Page<InsTestSeries> findByCategoryAndIsAdmin(long id, boolean isAdmin, Pageable pageable);
    Page<InsTestSeries> findByIsAdmin(boolean isAdmin,Pageable pageable);
    long countByCourseId(long id);

    @Modifying
    @Query("UPDATE InsTestSeries set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE InsTestSeries set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

}
