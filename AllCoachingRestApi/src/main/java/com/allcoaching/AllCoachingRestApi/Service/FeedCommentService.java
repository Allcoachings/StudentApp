package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.FeedComments;
import com.allcoaching.AllCoachingRestApi.Respository.FeedCommentRepo;
import com.allcoaching.AllCoachingRestApi.dto.FeedCommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeedCommentService {

    @Autowired
    private FeedCommentRepo feedCommentRepo;
    @Autowired
    private StudentService studentService;
    @Autowired InstituteService instituteService;

    //saving comment to database
    public FeedComments saveComment(FeedComments  feedComments)
    {
        return feedCommentRepo.save(feedComments);
    }


    //fetching paged comments by feedId
    public  Iterable<FeedCommentDto> fetchCommentsByFeedId(long feedId, int page, int pageSize)
    {
        Page<FeedComments> paged_result = feedCommentRepo.findByFeedIdOrderByTimeStampAsc(feedId, PageRequest.of(page,pageSize));
        if(paged_result.hasContent())
        {
            Iterable<FeedComments> feedComments =  paged_result.getContent();
            List<FeedCommentDto> feedCommentDtos = new ArrayList<>();
            feedComments.forEach(item->{
                FeedCommentDto feedCommentDto = new FeedCommentDto();
                feedCommentDto.setFeedComments(item);

                Optional commenter=null;

                switch(item.getCommenter())
                {
                    case 1://institute
                        commenter = instituteService.findById(item.getInsId());
                        break;
                    case 2://student
                        commenter = studentService.findById(item.getStudentId());
                        break;
                }
                feedCommentDto.setCommenterObject(commenter);
                feedCommentDtos.add(feedCommentDto);
            });
            return feedCommentDtos;
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
