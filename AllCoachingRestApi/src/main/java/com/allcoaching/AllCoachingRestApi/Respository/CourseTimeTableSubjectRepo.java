package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableSubject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CourseTimeTableSubjectRepo extends CrudRepository<CourseTimeTableSubject,Long> {

    @Query()
}
