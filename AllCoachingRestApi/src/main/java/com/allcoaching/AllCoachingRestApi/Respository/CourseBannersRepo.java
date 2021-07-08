package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseBannersRepo extends CrudRepository<CourseBanners,Long> {

    Iterable<CourseBanners> findAllByCourseId(long id);
}
