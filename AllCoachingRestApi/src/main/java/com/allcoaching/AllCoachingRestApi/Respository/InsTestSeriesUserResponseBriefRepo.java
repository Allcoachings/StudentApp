package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import com.allcoaching.AllCoachingRestApi.dto.StudentResponseBriefDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface InsTestSeriesUserResponseBriefRepo extends CrudRepository<InsTestSeriesUserResponseBrief,Long> {
    Optional<InsTestSeriesUserResponseBrief> findByStudentIdAndTestSeriesId(long studentId, long testSeriesId);
    long countByTestSeriesIdAndScoreGreaterThanEqual(long testSeriesId,long score);
    int countByTestSeriesIdAndScoreLessThan(long testSeriesId,long score);
    int countByTestSeriesId(long testSeriesId);

    @Modifying
    @Query("update InsTestSeriesUserResponseBrief set status=:status where id=:id")
    void updateResponseStatus(int status,long id);

    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.StudentResponseBriefDto(s,b) from InsTestSeriesUserResponseBrief b , Student s where b.studentId=s.id and b.testSeriesId=:id")
    Page<StudentResponseBriefDto> findByTestSeriesId(long id, Pageable pageable);
}
