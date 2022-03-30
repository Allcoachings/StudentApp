package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.   Transaction;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoPLayListRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CourseVideoService {
    @Autowired
    private CourseService courseService;

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

        long videoId = courseVideo.getId();
        CourseVideo courseVideo_saved  = courseVideoRepo.save(courseVideo);

        if(videoId==0)
        {
            System.out.println(courseVideo.getCourseId()+" video id after");
            courseService.sendNotificationAsync(courseVideo.getCourseId(),"new Video "+courseVideo.getName());
        }

        return courseVideo_saved;
    }
    public  void updateVideoLink(long id,String link)
    {
        courseVideoRepo.updateVideoLink(id,link);
    }
    public  void updateLiveVideoLink(long id,String link,String videoFormat)
    {
        courseVideoRepo.updateLiveVideoLink(id,link,videoFormat);
    }

    public  void updateVideoThumbLink(long id,String link)
    {
        courseVideoRepo.updateVideoThumb(id,link);
    }
    //fetching videos by playlist
    public Iterable<CourseVideo> findByPlaylist(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoPLayListRepo.playListContent(id,"offline",PageRequest.of(page,pageSize)));
    }

    //fetching videos by playlist and hidden parameter
    public Iterable<CourseVideo> findByPlaylistAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoPLayListRepo.findByPlaylistAndHidden(id,hidden,"offline",PageRequest.of(page,pageSize)));
    }

    //fetching video by course Id
    public  Iterable<CourseVideo> findByCourseId(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoRepo.findByCourseIdAndVideoType(id,"offline", PageRequest.of(page,pageSize)));
    }

    //fetching video by course Id
    public  Iterable<CourseVideo> findLiveVideosByCourseId(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoRepo.findByCourseIdAndVideoType(id,"live", PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"liveClassDate","liveClassTime"))));
    }
    //fetching video by course Id and hidden
    public  Iterable<CourseVideo> findByCourseIdAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoRepo.findByCourseIdAndHiddenAndVideoType(id, hidden,"offline",PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"date"))));
    }

    //fetching video by  Id
    public Optional<CourseVideo> findById(long id)
    {
        return courseVideoRepo.findById(id);
    }

    //fetching all playlists
    public Iterable<VideoPlaylist> findPlaylists(long id)
    {
        return courseVideoPLayListRepo.findByCourseId(id);
    }

    //updating published Status
    public void updatePublishedStatusById(boolean status,long id)
    {
        courseVideoRepo.updatePublishedStatus(status,id);
    }

    //updating streaming Status
    public void updateStreamingStatus(boolean status,long id)
    {
        courseVideoRepo.updateStreamingStatus(status,id);
    }

    //updating video views
    public void updateVideoViewsById(long id)
    {
        courseVideoRepo.updateCourseVideoViews(id);
    }

    //updating hidden Status
    public void updateHiddenStatusById(boolean status,long id)
    {
        courseVideoRepo.updateHiddenStatus(status,id);
    }

    //updating demo Status
    public void updateDemoStatusById(boolean status,long id)
    {
        courseVideoRepo.updateDemoStatus(status,id);
    }
    //updating playlist id
    public void updatePlaylistIdById(long playlistId,long id)
    {
        courseVideoRepo.updatePlaylistId(playlistId,id);
    }
    //delete
    public void delete(long id)
    {
        courseVideoRepo.deleteById(id);
    }

    //count course video
    public  long countByCourseIdAndVideoType(long courseId,String videoType)
    {
        return courseVideoRepo.countByCourseIdAndVideoType(courseId,videoType);
    }


    public Iterable<CourseVideo> extractDataFromPage(Page<CourseVideo> transactionPage)
    {
        if(transactionPage.hasContent())
        {
            return transactionPage.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    //deleting playlist
    public void deletePlaylist(long playlistId)
    {
        courseVideoPLayListRepo.deleteById(playlistId);
    }
}
