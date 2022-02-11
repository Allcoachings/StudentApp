package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentPlaylistRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CourseDocumentService {

    @Autowired
    private CourseDocumentRepo courseDocumentRepo;

    @Autowired
    private CourseDocumentPlaylistRepo courseDocumentPlaylistRepo;

    //creating playlist
    public DocumentPlaylist createPlaylist(DocumentPlaylist documentPlaylist)
    {
        return  courseDocumentPlaylistRepo.save(documentPlaylist);
    }

    //saving document to document  repo
    public CourseDocument save(CourseDocument courseDocument)
    {
        return courseDocumentRepo.save(courseDocument);
    }

    //fetching documents  by course id
    public Iterable<CourseDocument> findByCourseId(long id,int page,int pageSize)
    {
        return extractDataFromPage(courseDocumentRepo.findByCourseId(id, PageRequest.of(page,pageSize)));

    }
    //fetching documents  by course id and hidden parameter
    public Iterable<CourseDocument> findByCourseIdAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(courseDocumentRepo.findByCourseIdAndHidden(id, hidden,PageRequest.of(page,pageSize)));

    }

    //fetching  documents  by playlist id
    public Iterable<CourseDocument> findByPlaylistId(long id,int page,int pageSize)
    {

        return extractDataFromPage(courseDocumentPlaylistRepo.playListContent(id,PageRequest.of(page,pageSize)));
    }

    //fetching  documents  by playlist id and hidden parameter
    public Iterable<CourseDocument> findByPlaylistIdAndHidden(long id,boolean hidden,int page,int pageSize)
    {

        return extractDataFromPage(courseDocumentPlaylistRepo.findByPlaylistIdAndHidden(id,hidden,PageRequest.of(page,pageSize)));

    }


    //fetching single document by document id
    public  Optional<CourseDocument> findById(long id)
    {
        return courseDocumentRepo.findById(id);
    }


    //fetching playlists by course id
    public  Iterable<DocumentPlaylist> findByDocumentPlaylists(long id)
    {
        return courseDocumentPlaylistRepo.findByCourseId(id);
    }
    public void updateDocumentLink(String link,long id)
    {
        courseDocumentRepo.updateDocumentLink(link,id);
    }

    //updating published Status
    public void updatePublishedStatusById(boolean status,long id)
    {
        courseDocumentRepo.updatePublishedStatus(status,id);
    }

    //updating hidden Status
    public void updateHiddenStatusById(boolean status,long id)
    {
        courseDocumentRepo.updateHiddenStatus(status,id);
    }

    //updating hidden Status
    public void updateDemoStatusById(boolean status,long id)
    {
        courseDocumentRepo.updateDemoStatus(status,id);
    }

    //updating playlist id
    public void updatePlaylistIdById(long playlistId,long id)
    {
        courseDocumentRepo.updatePlaylistId(playlistId,id);
    }

    //delete by id
    public void delete(long id)
    {
        courseDocumentRepo.deleteById(id);
    }

    //delete playlist
    public void deletePlaylistById(long playlist)
    {
        courseDocumentPlaylistRepo.deleteById(playlist);

    }
    //count course documents
    public  long countCourseDocuments(long courseId)
    {
        return courseDocumentRepo.countByCourseId(courseId);
    }
    public Iterable<CourseDocument> extractDataFromPage(Page<CourseDocument> transactionPage)
    {
        if(transactionPage.hasContent())
        {
            return transactionPage.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }
}
