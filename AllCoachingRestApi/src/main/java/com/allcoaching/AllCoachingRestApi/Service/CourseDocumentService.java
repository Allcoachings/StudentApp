package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.DocumentPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentPlaylistRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Iterable<CourseDocument> findByCourseId(long id)
    {
        return courseDocumentRepo.findByCourseId(id);

    }

    //fetching  documents  by playlist id
    public Iterable<CourseDocument> findByPlaylistId(long id)
    {

        return courseDocumentPlaylistRepo.playListContent(id);
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

    //delete by id
    public void delete(long id)
    {
        courseDocumentRepo.deleteById(id);
    }

}
