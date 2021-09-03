package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
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
public interface CourseVideoRepo extends PagingAndSortingRepository<CourseVideo,Long> {

    Page<CourseVideo> findByCourseId(long id, Pageable pageable);
    long  countByCourseId(long courseId);

    @Modifying
    @Query("UPDATE CourseVideo set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE CourseVideo set published=:publishedStatus WHERE id=:id")
    void updateCourseVideoViews(long id);

    @Modifying
    @Query("UPDATE CourseVideo set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

}
