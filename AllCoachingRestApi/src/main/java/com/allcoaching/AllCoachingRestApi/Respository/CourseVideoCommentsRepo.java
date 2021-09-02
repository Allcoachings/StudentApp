package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideoComments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseVideoCommentsRepo extends PagingAndSortingRepository<CourseVideoComments,Long> {



    Page<CourseVideoComments> findByVideoId(long videoId, Pageable pageable);
}
