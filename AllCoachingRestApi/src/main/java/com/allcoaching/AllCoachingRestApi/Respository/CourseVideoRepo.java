package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import org.springframework.data.repository.CrudRepository;

public interface CourseVideoRepo extends CrudRepository<CourseVideo,Long> {

    Iterable<CourseVideo> findByCourseId(long id);

}
