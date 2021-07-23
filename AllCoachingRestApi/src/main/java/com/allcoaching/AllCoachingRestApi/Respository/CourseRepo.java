package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CourseRepo extends CrudRepository<Course,Long> {

    Iterable<Course> findByInstId(long id);

    @Modifying
    @Query("UPDATE Course set leads=leads+1 where id=:id")
    void updateCourseLeads(long id);

}
