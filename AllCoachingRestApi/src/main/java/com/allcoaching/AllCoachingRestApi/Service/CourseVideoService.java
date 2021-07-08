package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoPLayListRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseVideoService {
    @Autowired
    private CourseVideoPLayListRepo courseVideoPLayListRepo;
    @Autowired
    private CourseVideoRepo courseVideoRepo;

    //creating video playlist
    public VideoPlaylist createPlaylist(VideoPlaylist videoPlaylist)
    {
        return  courseVideoPLayListRepo.save(videoPlaylist);
    }

    //saving video to video repo
    public CourseVideo saveCourseVideo(CourseVideo courseVideo)
    {
        return courseVideoRepo.save(courseVideo);
    }

    //fetching videos by playlist
    public Optional<VideoPlaylist> findByPlaylist(long id)
    {
        return courseVideoPLayListRepo.findById(id);
    }

    //fetching video by course Id
    public  Iterable<CourseVideo> findByCourseId(long id)
    {
        return courseVideoRepo.findByCourseId(id);
    }

    //fetching video by  Id
    public Optional<CourseVideo> findById(long id)
    {
        return courseVideoRepo.findById(id);
    }
}
