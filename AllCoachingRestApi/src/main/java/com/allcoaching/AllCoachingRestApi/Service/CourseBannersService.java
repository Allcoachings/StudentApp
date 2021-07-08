package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseBanners;
import com.allcoaching.AllCoachingRestApi.Respository.CourseBannersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseBannersService {

    @Autowired
    private CourseBannersRepo courseBannersRepo;

    //saving banners to repo
    public CourseBanners save(CourseBanners courseBanners)
    {
        return courseBannersRepo.save(courseBanners);
    }

    //getting course banner using  id
    public Optional<CourseBanners> findById(long id)
    {
        return courseBannersRepo.findById(id);
    }

    //fetching all banners of a course
    public  Iterable<CourseBanners> findByCourseId(long id)
    {
        return courseBannersRepo.findAllByCourseId(id);
    }


}
