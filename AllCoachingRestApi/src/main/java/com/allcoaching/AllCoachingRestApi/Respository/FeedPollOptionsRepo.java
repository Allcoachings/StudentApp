package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.FeedPollOptions;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FeedPollOptionsRepo extends CrudRepository<FeedPollOptions,Long> {


    Iterable<FeedPollOptions> findByFeedId(Long id);
}
