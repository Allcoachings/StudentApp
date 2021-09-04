package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import com.allcoaching.AllCoachingRestApi.dto.StudentPurchaseDto;
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


    Optional<InsReview> findByInsIdAndStudentIdAndReviewNotNull(long insId, long studentId);
    Optional<InsReview> findByCourseIdAndStudentId(long courseId, long studentId);

    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.InsReviewDto(s.name,i.name, s.studentImage, r) from Institute i, InsReview r, Student s where r.insId=i.id and i.id = :id and r.studentId=s.id")
    Page<InsReviewDto> findByInsId(long id, Pageable pageable);


    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.StudentPurchaseDto(i.id,i.name, i.logo, c.title) from Institute i, InsReview r,Course c where r.insId=i.id and r.courseId=c.id and r.studentId=:id")
    Page<StudentPurchaseDto> findByStudentId(long id, Pageable pageable);


    @Modifying
    @Query("UPDATE InsReview set reply=:reply where id=:id")
     int setReply(long id, String reply);

    @Modifying
    @Query("UPDATE InsReview set review=:review, rating=:rating where courseId=:courseId and studentId=:studentId")
    int addReview(long courseId, long studentId, String review, int rating);


    @Modifying
    @Query("UPDATE InsReview set review=:review, rating=:rating where id=:id")
    int updateReviewById(long id, String review, int rating);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto(c.id,c.title,c.leads) from Course c , InsReview ir where c.id = ir.courseId and ir.insId=:id")
    Page<InsLeadsDto> findAllByInsId(long id, Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto(s.id,s.name,s.studentImage,s.userId) from Student s , InsReview ir where s.id = ir.studentId and ir.courseId=:id")
    Page<InsLeadsStudentDto> findAllByCourseId(long id, Pageable pageable);


    long countByCourseId(long courseId);
    long countByInsId(long insId);



}
