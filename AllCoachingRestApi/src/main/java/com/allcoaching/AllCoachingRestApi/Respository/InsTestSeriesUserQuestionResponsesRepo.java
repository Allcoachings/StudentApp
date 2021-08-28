package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserQuestionResponses;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface InsTestSeriesUserQuestionResponsesRepo extends CrudRepository<InsTestSeriesUserQuestionResponses,Long> {

}
