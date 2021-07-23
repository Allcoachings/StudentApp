package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestSeriesPlaylistRepo extends CrudRepository<InsTestSeriesPlaylist,Long>{

    @Query("SELECT ts from InsTestSeriesPlaylist tsp , InsTestSeries ts where tsp.id=ts.playlistId and tsp.id = :id and ts.isAdmin=:isAdmin")
    Iterable<InsTestSeries> playListContent(long id,boolean isAdmin);

}
