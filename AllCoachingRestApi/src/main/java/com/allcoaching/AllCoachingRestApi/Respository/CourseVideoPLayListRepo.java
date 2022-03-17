package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CourseVideoPLayListRepo extends CrudRepository<VideoPlaylist,Long> {


    @Query("SELECT cv from VideoPlaylist vp , CourseVideo cv where vp.id=cv.playlistId and vp.id = :id and cv.videoType=:videoType")
    Page<CourseVideo> playListContent(long id,String videoType, Pageable pageable);

    @Query("SELECT cv from VideoPlaylist vp , CourseVideo cv where vp.id=cv.playlistId and vp.id = :id and cv.hidden=:hidden and cv.videoType=:videoType")
    Page<CourseVideo> findByPlaylistAndHidden(long id, boolean hidden,String videoType,Pageable pageable);

    Iterable<VideoPlaylist> findByCourseId(long id);
}
