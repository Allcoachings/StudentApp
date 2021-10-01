package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.Entity.VideoPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoPLayListRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public  void updateVideoLink(long id,String link)
    {
        courseVideoRepo.updateVideoLink(id,link);
    }

    public  void updateVideoThumbLink(long id,String link)
    {
        courseVideoRepo.updateVideoThumb(id,link);
    }
    //fetching videos by playlist
    public Iterable<CourseVideo> findByPlaylist(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoPLayListRepo.playListContent(id,PageRequest.of(page,pageSize)));
    }

    //fetching videos by playlist and hidden parameter
    public Iterable<CourseVideo> findByPlaylistAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoPLayListRepo.findByPlaylistAndHidden(id,hidden,PageRequest.of(page,pageSize)));
    }

    //fetching video by course Id
    public  Iterable<CourseVideo> findByCourseId(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoRepo.findByCourseId(id, PageRequest.of(page,pageSize)));
    }
    //fetching video by course Id and hidden
    public  Iterable<CourseVideo> findByCourseIdAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(courseVideoRepo.findByCourseIdAndHidden(id, hidden,PageRequest.of(page,pageSize)));
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
    public  long countCourseVideo(long courseId)
    {
        return courseVideoRepo.countByCourseId(courseId);
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
