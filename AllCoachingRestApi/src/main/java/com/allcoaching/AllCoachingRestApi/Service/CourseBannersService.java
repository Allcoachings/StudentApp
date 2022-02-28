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
        return courseBannersRepo.findAllByCourseIdOrderByAddDateDesc(id);
    }

    //delete banner by id
    public void delete(long id)
    {
        courseBannersRepo.deleteById(id);
    }

    //updating published Status
    public void updatePublishedStatusById(boolean status,long id)
    {
        courseBannersRepo.updatePublishedStatus(status,id);
    }


    public  long countCourseBanners(long id)
    {
        return  courseBannersRepo.countByCourseId(id);
    }

}
