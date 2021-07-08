package com.allcoaching.AllCoachingRestApi.Service;

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

    //fetching single course documents  by course id
    public Iterable<CourseDocument> findByCourseId(long id)
    {
        return courseDocumentRepo.findByCourseId(id);

    }

    //fetching single document playlist by playlist id
    public Optional<DocumentPlaylist> findByPlaylistId(long id)
    {

        return courseDocumentPlaylistRepo.findById(id);
    }


    //fetching single document by document id
    public  Optional<CourseDocument> findById(long id)
    {
        return courseDocumentRepo.findById(id);
    }

}