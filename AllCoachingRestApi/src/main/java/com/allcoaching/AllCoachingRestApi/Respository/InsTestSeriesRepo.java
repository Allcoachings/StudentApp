package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesRepo extends PagingAndSortingRepository<InsTestSeries,Long> {
    Iterable<InsTestSeries> findByCourseId(long id);
}
