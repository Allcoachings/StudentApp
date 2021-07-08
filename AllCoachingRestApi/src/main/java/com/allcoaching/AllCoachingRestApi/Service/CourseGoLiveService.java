package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseGoLive;
import com.allcoaching.AllCoachingRestApi.Respository.CourseGoLiveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseGoLiveService {

    @Autowired
    private CourseGoLiveRepo courseGoLiveRepo;

    //inserting courseGOLIVE TO REPO
    public CourseGoLive save(CourseGoLive courseGoLive)
    {
        return courseGoLiveRepo.save(courseGoLive);
    }

    //find all golive using courseId
    public Iterable<CourseGoLive> findByCourseId(long id)
    {
        return courseGoLiveRepo.findByCourseId(id);
    }
    //find single golive by id
    public Optional<CourseGoLive> findById(long id)
    {
        return courseGoLiveRepo.findById(id);
    }
}


