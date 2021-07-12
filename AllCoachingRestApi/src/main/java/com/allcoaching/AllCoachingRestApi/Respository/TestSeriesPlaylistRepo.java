package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.TestSeriesPlaylist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestSeriesPlaylistRepo extends CrudRepository<TestSeriesPlaylist,Long>{

    @Query("SELECT ts from TestSeriesPlaylist tsp , InsTestSeries ts where tsp.id=ts.playlistId and tsp.id = :id")
    Iterable<InsTestSeries> playListContent(long id);

}
