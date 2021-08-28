package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesUserResponseBriefRepo extends CrudRepository<InsTestSeriesUserResponseBrief,Long> {
    Iterable<InsTestSeriesUserResponseBrief> findByStudentIdAndTestSeriesId(long studentId,long testSeriesId);

}
