package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.FeedPollOptions;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface FeedPollOptionsRepo extends CrudRepository<FeedPollOptions,Long> {


    Iterable<FeedPollOptions> findByFeedId(Long id);

    @Modifying
    @Query("UPDATE FeedPollOptions set upVotes=upVotes+1 where id=:id")
    void pollOptionUpVote(long id);


}
