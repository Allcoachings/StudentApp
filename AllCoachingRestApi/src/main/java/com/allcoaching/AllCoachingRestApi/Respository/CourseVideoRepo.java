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

    Page<CourseVideo> findByCourseIdAndVideoType(long id, String videoType,Pageable pageable);
    Page<CourseVideo> findByCourseIdAndHiddenAndVideoType(long id, boolean hidden,String videoType,Pageable pageable);
    long  countByCourseId(long courseId);

    @Modifying
    @Query("UPDATE CourseVideo set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE CourseVideo set views=views+1 WHERE id=:id")
    void updateCourseVideoViews(long id);

    @Modifying
    @Query("UPDATE CourseVideo set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

    @Modifying
    @Query("UPDATE CourseVideo set isDemo=:status WHERE id=:id")
    void updateDemoStatus(boolean status,long id);

    @Modifying
    @Query("UPDATE CourseVideo set playlistId=:playlistId WHERE id=:id")
    void updatePlaylistId(long playlistId,long id);

    @Modifying
    @Query("UPDATE CourseVideo set videoLocation=:link WHERE id=:id")
    void updateVideoLink(long id,String link);

    @Modifying
    @Query("UPDATE CourseVideo set videoThumb=:link WHERE id=:id")
    void updateVideoThumb(long id,String link);

}
