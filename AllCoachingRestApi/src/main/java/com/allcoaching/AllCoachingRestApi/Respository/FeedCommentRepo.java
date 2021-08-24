package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.FeedComments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface FeedCommentRepo extends PagingAndSortingRepository<FeedComments,Long> {

    Page<FeedComments> findByFeedIdOrderByTimeStampAsc(long feedId, Pageable pageable);
}
