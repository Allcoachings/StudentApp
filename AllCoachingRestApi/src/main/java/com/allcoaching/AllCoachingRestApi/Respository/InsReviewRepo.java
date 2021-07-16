package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;


@Repository
@Transactional
public interface InsReviewRepo extends PagingAndSortingRepository<InsReview,Long> {

    @Query("SELECT r from InsReview r where r.courseId = :courseId and r.studentId = :studentId")
    Optional<InsReview> findByCourseIdStudentId(long courseId, long studentId);

    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.InsReviewDto(s.name,i.name, s.studentImage, r) from Institute i, InsReview r, Student s where r.insId=i.id and i.id = :id and r.studentId=s.id")
    Page<InsReviewDto> findByInsId(long id, Pageable pageable);


    @Modifying
    @Query("UPDATE InsReview set reply=:reply where id=:id")
     int setReply(long id, String reply);

    @Modifying
    @Query("UPDATE InsReview set review=:review, rating=:rating where courseId=:courseId and studentId=:studentId")
    int addReview(long courseId, long studentId, String review, int rating);

}