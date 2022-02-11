package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
@Transactional
public interface CourseDocumentRepo extends PagingAndSortingRepository<CourseDocument,Long> {

    Page<CourseDocument> findByCourseId(long id, Pageable pageable);
    Page<CourseDocument> findByCourseIdAndHidden(long id, boolean hidden,Pageable pageable);
    long countByCourseId(long courseId);
    @Modifying
    @Query("UPDATE CourseDocument set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    @Modifying
    @Query("UPDATE CourseDocument set hidden=:hiddenStatus WHERE id=:id")
    void updateHiddenStatus(boolean hiddenStatus,long id);

    @Modifying
    @Query("UPDATE CourseDocument set isDemo=:status WHERE id=:id")
    void updateDemoStatus(boolean status,long id);

    @Modifying
    @Query("UPDATE CourseDocument set playlistId=:playlistId WHERE id=:id")
    void updatePlaylistId(long playlistId,long id);

    @Modifying
    @Query("UPDATE CourseDocument set fileAddress=:fileAddress WHERE id=:id")
    void updateDocumentLink(String fileAddress,long id);

}
