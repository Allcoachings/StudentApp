package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesRepo extends PagingAndSortingRepository<InsTestSeries,Long> {
    Iterable<InsTestSeries> findByCourseId(long id);
    Page<InsTestSeries> findByCategoryAndIsAdmin(long id, boolean isAdmin, Pageable pageable);
    Page<InsTestSeries> findByIsAdmin(boolean isAdmin,Pageable pageable);

}
