package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
@Transactional
public interface CourseDocumentRepo extends PagingAndSortingRepository<CourseDocument,Long> {

    Iterable<CourseDocument> findByCourseId(long id);

    @Modifying
    @Query("UPDATE CourseDocument set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE CourseDocument set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

}
