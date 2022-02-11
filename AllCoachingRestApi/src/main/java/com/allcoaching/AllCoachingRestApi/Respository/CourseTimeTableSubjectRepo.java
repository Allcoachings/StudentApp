package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableSubject;
import com.allcoaching.AllCoachingRestApi.dto.CourseTimeTableDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseTimeTableSubjectRepo extends CrudRepository<CourseTimeTableSubject,Long> {

    @Query("SELECT i FROM CourseTimeTableSubject s ,CourseTimeTableItem i WHERE s.id=i.subjectId and s.id=:id order by i.date desc,time desc")
    Iterable<CourseTimeTableItem> findBySubject(long id);

    Page<CourseTimeTableSubject> findByCourseId(long id, Pageable pageable);
}
