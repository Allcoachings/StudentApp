package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CourseGoLiveRepo extends PagingAndSortingRepository<CourseGoLive,Long> {

    Iterable<CourseGoLive> findByCourseId(long id);

}
