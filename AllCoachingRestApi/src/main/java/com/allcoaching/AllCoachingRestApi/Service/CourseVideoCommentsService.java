package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideoComments;
import com.allcoaching.AllCoachingRestApi.Respository.CourseVideoCommentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CourseVideoCommentsService {
    @Autowired
    private CourseVideoCommentsRepo courseVideoCommentsRepo;

    public  CourseVideoComments addComment(CourseVideoComments courseVideoComments)
    {
        return courseVideoCommentsRepo.save(courseVideoComments);
    }

    public Iterable<CourseVideoComments> fetch_comments(long v_id,int page,int page_size)
    {
         Page<CourseVideoComments> paged_result =  courseVideoCommentsRepo.findByVideoId(v_id, PageRequest.of(page,page_size));
        if(paged_result.hasContent())
        {
            return paged_result.getContent();
        }else
        {
            return new ArrayList<>();
        }

    }


}
