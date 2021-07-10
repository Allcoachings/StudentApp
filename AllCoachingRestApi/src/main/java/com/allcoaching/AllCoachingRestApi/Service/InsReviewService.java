package com.allcoaching.AllCoachingRestApi.Service;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Respository.InsReviewRepo;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class InsReviewService {

    @Autowired
    private InsReviewRepo insReviewRepo;

    //fetch all reviews
    public  Iterable<InsReviewDto> getAllReviews(Integer pageNo, Integer pageSize, String sortBy,long insId)
    {

        Pageable paging  = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        Page<InsReviewDto> pagedResult = insReviewRepo.findByInsId(insId,paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<InsReviewDto>();
        }
    }

    //inserting review to repo
    public InsReview save(InsReview insReview)
    {
        return insReviewRepo.save(insReview);
    }

    public int setReply(InsReview insReview){
        return insReviewRepo.setReply(insReview.getInsId(), insReview.getReview());
    }
}
