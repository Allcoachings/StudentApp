package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableSubject;
import com.allcoaching.AllCoachingRestApi.dto.CourseTimeTableDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseTimeTableSubjectRepo extends CrudRepository<CourseTimeTableSubject,Long> {

    @Query("SELECT i FROM CourseTimeTableSubject s ,CourseTimeTableItem i WHERE s.id=i.subjectId and s.id=:id")
    Iterable<CourseTimeTableItem> findBySubject(long id);

    Iterable<CourseTimeTableSubject> findByCourseId(long id);
}
