package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.FeedImages;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface FeedImageRepo extends CrudRepository<FeedImages,Long> {
    Iterable<FeedImages> findByFeedId(long feedId);
    void deleteByFeedId(long feedId);
}

