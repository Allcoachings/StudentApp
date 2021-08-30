package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsTestSeriesQuestionsRepo extends PagingAndSortingRepository<InsTestSeriesQuestions,Long> {

    @Query(value="Select new com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto(q) FROM InsTestSeriesQuestions q where q.testSeriesId=:id",countQuery = "Select count(q) from   InsTestSeriesQuestions q where q.testSeriesId=:id")
    Page<TestSeriesQuestionDto> findByTestSeriesId(long id, Pageable page);
}
