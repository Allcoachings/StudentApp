package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedRepo extends PagingAndSortingRepository<Feed,Long> {


Page<Feed> findByInsId(long insId, Pageable page);

Page<Feed> findByTagsContaining(String tags,Pageable page);
}
