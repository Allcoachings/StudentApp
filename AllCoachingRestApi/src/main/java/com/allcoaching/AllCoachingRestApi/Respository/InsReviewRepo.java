package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;


@Repository
@Transactional
public interface InsReviewRepo extends PagingAndSortingRepository<InsReview,Long> {


    Optional<InsReview> findByInsIdAndStudentIdAndReviewNotNull(long insId, long studentId);
    Optional<InsReview> findByCourseIdAndStudentId(long courseId, long studentId);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto(s.id,s.name,s.studentImage,s.userId) from InsReview r,Student s where r.studentId=s.id and r.courseId=:courseId")
    Page<InsLeadsStudentDto> findByCourseId(long courseId, Pageable pageable);



    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.CategoryRevenueDto(cat,(Select sum(c.fees) from InsReview r,Course c,Institute i,Category cat where r.courseId=c.id and c.instId=i.id and r.insId=i.id and i.category=cat.id   and time>=CURRENT_DATE group by cat.id),sum(c.fees)) from InsReview r,Course c,Institute i,Category cat where r.courseId=c.id and c.instId=i.id and r.insId=i.id and i.category=cat.id   group by cat.id")
    Iterable<CategoryRevenueDto> categoryWiseTotalRevenue();

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InstituteRevenueDto(i,(Select sum(c.fees) from InsReview r,Course c,Institute i,Category cat where r.courseId=c.id and c.instId=i.id and r.insId=i.id and i.category=cat.id   and time>=CURRENT_DATE and cat.id=:catId group by i.id),sum(c.fees)) from InsReview r,Course c,Institute i,Category cat where r.courseId=c.id and c.instId=i.id and r.insId=i.id and i.category=cat.id and cat.id=:catId  group by i.id")
    Iterable<InstituteRevenueDto> instituteRevenueOverviewCategoryWise(long catId);


    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.CourseRevenueDto(c,(Select sum(c.fees) from InsReview r,Course c where r.courseId=c.id and r.insId=:insId and time>=CURRENT_DATE  group by c.id),sum(c.fees)) from InsReview r,Course c where r.courseId=c.id and c.instId=:insId  group by c.id")
    Iterable<CourseRevenueDto> instituteCourseRevenueOverviewCategoryWise(long insId);

    @Query("Select sum(c.fees) from InsReview r,Course c where  r.courseId=c.id and r.time >= CURRENT_DATE")
    Double todayRevenue();

    @Query("Select sum(c.fees) from InsReview r,Course c where  r.courseId=c.id")
    Double totalRevenue();

    @Query("Select sum(c.fees) from InsReview r,Course c where  r.courseId=c.id and r.insId=:insId and r.time >= CURRENT_DATE")
    Double todayRevenueIns(long insId);

    @Query("Select sum(c.fees) from InsReview r,Course c where  r.courseId=c.id and r.insId=:insId")
    Double totalRevenueIns(long insId);



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



    @Query(name="salesOverview", nativeQuery = true)
    Iterable<SalesOverViewDataDto> findAllGroupedByCourseId(@Param("insId") long insId);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto(s.id,s.name,s.studentImage,s.userId) from Student s , InsReview ir where s.id = ir.studentId and ir.courseId=:id")
    Page<InsLeadsStudentDto> findAllByCourseId(long id, Pageable pageable);



    long countByCourseId(long courseId);
    long countByInsId(long insId);

    @Query(name = "insRevenueGraphDataYearly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataYearly(@Param("insId") long insId);
    @Query(name = "insRevenueGraphDataMonthly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataMontly(@Param("insId") long insId,@Param("dataYear") int dataTime);
    @Query(name = "insRevenueGraphDataWeekly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataWeekly(@Param("insId") long insId,@Param("dataMonth")int dataTime);

    @Query(name = "adminRevenueGraphDataYearly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminRevenueGraphDataYearly();
    @Query(name = "adminRevenueGraphDataMonthly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminRevenueGraphDataMonthly(@Param("dataYear") int dataTime);
    @Query(name = "adminRevenueGraphDataWeekly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminRevenueGraphDataWeekly(@Param("dataMonth")int dataTime);


    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.CategoryWisePurchaseDataDto(s,i,c)  from" +
            " Student s,Institute i,Course c,InsReview ir where i.category=:categoryId and ir.courseId=c.id and ir.studentId=s.id and ir.insId=i.id")
    Page<CategoryWisePurchaseDataDto> findEnrolledStudentsByCategoryId(long categoryId,Pageable pageable);

}
