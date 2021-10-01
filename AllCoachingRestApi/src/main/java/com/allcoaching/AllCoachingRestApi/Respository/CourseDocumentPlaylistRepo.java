package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDocumentPlaylistRepo extends CrudRepository<DocumentPlaylist,Long> {
    @Query("SELECT cd from DocumentPlaylist dp , CourseDocument cd where dp.id=cd.playlistId and dp.id = :id")
    Page<CourseDocument> playListContent(long id, Pageable pageable);
    @Query("SELECT cd from DocumentPlaylist dp , CourseDocument cd where dp.id=cd.playlistId and dp.id = :id and hidden=:hidden")
    Page<CourseDocument> findByPlaylistIdAndHidden(long id,boolean hidden ,Pageable pageable);

    Iterable<DocumentPlaylist> findByCourseId(long id);
}
