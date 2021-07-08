package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDocumentPlaylistRepo extends CrudRepository<DocumentPlaylist,Long> {

}
