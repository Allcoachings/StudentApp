package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CourseBannersRepo extends CrudRepository<CourseBanners,Long> {

    Iterable<CourseBanners> findAllByCourseIdOrderByAddDateDesc(long id);

    @Modifying
    @Query("UPDATE CourseBanners set published=:publishedStatus WHERE id=:id")
    void updatePublishedStatus(boolean publishedStatus,long id);

    long countByCourseId(long courseId);
}


