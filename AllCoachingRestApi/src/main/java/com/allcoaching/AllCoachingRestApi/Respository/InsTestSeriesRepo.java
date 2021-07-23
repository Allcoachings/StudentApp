package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesRepo extends PagingAndSortingRepository<InsTestSeries,Long> {
    Iterable<InsTestSeries> findByCourseIdAndIsAdmin(long id,boolean isAdmin);
    Page<InsTestSeries> findByCategoryAndIsAdmin(long id, boolean isAdmin, Pageable pageable);
    Page<InsTestSeries> findByIsAdmin(boolean isAdmin,Pageable pageable);

}
