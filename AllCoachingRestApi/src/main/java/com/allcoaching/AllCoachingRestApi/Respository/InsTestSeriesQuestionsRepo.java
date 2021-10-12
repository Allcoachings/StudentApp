package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface InsTestSeriesQuestionsRepo extends PagingAndSortingRepository<InsTestSeriesQuestions,Long> {

    @Query(value="Select new com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto(q) FROM InsTestSeriesQuestions q where q.testSeriesId=:id",countQuery = "Select count(q) from   InsTestSeriesQuestions q where q.testSeriesId=:id")
    Page<TestSeriesQuestionDto> findByTestSeriesId(long id, Pageable page);

    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set question=:value , questionType=:type where id=:id")
    void updateQuestionField(String value,int type,long id);

    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set optionA=:value , optionType=:type where id=:id")
    void updateOptionAField(String value,int type,long id);

    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set optionB=:value , optionType=:type where id=:id")
    void updateOptionBField(String value,int type,long id);

    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set optionC=:value , optionType=:type where id=:id")
    void updateOptionCField(String value,int type,long id);

    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set optionD=:value , optionType=:type where id=:id")
    void updateOptionDField(String value,int type,long id);


    @Modifying
    @Query("UPDATE InsTestSeriesQuestions set correctOpt=:correctOpt , explanation=:explanation,correctMarks=:correctMarks,wrongMarks=:wrongMarks where id=:id")
    void updateQuestionDetails(String correctOpt,String explanation,float correctMarks,float wrongMarks,long id);


}
