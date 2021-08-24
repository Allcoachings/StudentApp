package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.FeedComments;
import com.allcoaching.AllCoachingRestApi.Respository.FeedCommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FeedCommentService {

    @Autowired
    private FeedCommentRepo feedCommentRepo;


    //saving comment to database
    public FeedComments saveComment(FeedComments  feedComments)
    {
        return feedCommentRepo.save(feedComments);
    }


    //fetching paged comments by feedId
    public  Iterable<FeedComments> fetchCommentsByFeedId(long feedId,int page,int pageSize)
    {
        Page<FeedComments> paged_result = feedCommentRepo.findByFeedIdOrderByTimeStampAsc(feedId, PageRequest.of(page,pageSize));
        if(paged_result.hasContent())
        {
            return paged_result.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    //delete comment
    public  void deleteCommentById(long id)
    {
        feedCommentRepo.deleteById(id);
    }
}
