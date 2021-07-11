package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesQuestionsRepo extends CrudRepository<InsTestSeriesQuestions,Long> {

    Iterable<InsTestSeriesQuestions> findByTestSeriesId(long id);
}
