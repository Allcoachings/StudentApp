package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourseDocumentRepo extends PagingAndSortingRepository<CourseDocument,Long> {

    Iterable<CourseDocument> findByCourseId(long id);
}
