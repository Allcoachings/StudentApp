package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserQuestionResponses;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesUserQuestionResponsesRepo extends CrudRepository<InsTestSeriesUserQuestionResponses,Long> {

}
