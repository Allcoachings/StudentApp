package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CourseVideoPLayListRepo extends CrudRepository<VideoPlaylist,Long> {


    @Query("SELECT cv from VideoPlaylist vp , CourseVideo cv where vp.id=cv.playlistId and vp.id = :id")
    Iterable<CourseVideo> playListContent(long id);

    Iterable<VideoPlaylist> findByCourseId(long id);
}
