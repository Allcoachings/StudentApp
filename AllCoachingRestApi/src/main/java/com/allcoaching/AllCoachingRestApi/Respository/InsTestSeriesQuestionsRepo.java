package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesQuestionsRepo extends PagingAndSortingRepository<InsTestSeriesQuestions,Long> {

    Page<InsTestSeriesQuestions> findByTestSeriesId(long id, Pageable page);
}
