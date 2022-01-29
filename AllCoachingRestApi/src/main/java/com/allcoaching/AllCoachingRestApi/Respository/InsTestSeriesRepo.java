package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface InsTestSeriesRepo extends PagingAndSortingRepository<InsTestSeries,Long> {
    Page<InsTestSeries> findByCourseIdAndIsAdmin(long id,boolean isAdmin,Pageable pageable);
    Page<InsTestSeries> findByCourseIdAndIsAdminAndHidden(long id,boolean isAdmin,boolean hidden,Pageable pageable);
    Page<InsTestSeries> findByPlaylistIdAndIsAdmin(long id,boolean isAdmin,Pageable pageable);
    Page<InsTestSeries> findByPlaylistIdAndIsAdminAndHidden(long id,boolean isAdmin,boolean hidden,Pageable pageable);
    Page<InsTestSeries> findByCategoryAndIsAdmin(long id, boolean isAdmin, Pageable pageable);


    Page<InsTestSeries> findByIsAdmin(boolean isAdmin,Pageable pageable);
    long countByCourseId(long id);

    @Modifying
    @Query("UPDATE InsTestSeries set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE InsTestSeries set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

    @Modifying
    @Query("UPDATE InsTestSeries set playlistId=:playlistId WHERE id=:id")
    void updatePlaylistId(long playlistId,long id);

    @Modifying
    @Query("UPDATE InsTestSeries set questionCount=questionCount+1 where id=:id")
    void updateQuestionCountByOne(long id);

    @Modifying
    @Query("UPDATE InsTestSeries set questionCount=questionCount-1 where id=:id")
    void decreaseQuestionCountByOne(long id);

    @Modifying
    @Query("UPDATE InsTestSeries set questionCount=:count where id=:id")
    void updateQuestionCount(int count,long id);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto(t,r) from InsTestSeries t LEFT JOIN InsTestSeriesUserResponseBrief r on r.testSeriesId=t.id and r.studentId=:userId where t.playlistId=:playlistId and t.isAdmin=:isAdmin and t.hidden=false")
    Page<TestSeriesAndUserResponseDto> getTestSeriesByPlaylistIDWithUserResponse(long userId, long playlistId, boolean isAdmin, Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto(t,r) from InsTestSeries t LEFT JOIN InsTestSeriesUserResponseBrief r on r.testSeriesId=t.id and r.studentId=:userId where t.courseId=:courseId and t.isAdmin=:isAdmin and t.hidden=false")
    Page<TestSeriesAndUserResponseDto> getTestSeriesByCourseIdAndIsAdminWithUserResponse(long userId, long courseId, boolean isAdmin, Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto(t,r) from InsTestSeries t LEFT JOIN InsTestSeriesUserResponseBrief r on r.testSeriesId=t.id and r.studentId=:userId where t.category=:category and t.isAdmin=:isAdmin and t.hidden=false")
    Page<TestSeriesAndUserResponseDto> findByCategoryAndIsAdminAndStudentId(long category, boolean isAdmin,long userId, Pageable pageable);



}
