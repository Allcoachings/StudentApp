package com.allcoaching.AllCoachingRestApi.Service;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Respository.InsReviewRepo;
import com.allcoaching.AllCoachingRestApi.dto.InsReviewDto;
import com.allcoaching.AllCoachingRestApi.dto.StudentPurchaseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

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


    //count course reviews
    public  long countCourseReviews(long courseId)
    {
        return insReviewRepo.countByCourseId(courseId);
    }
    //count institute reviews
    public  long countInstituteReviews(long insId)
    {
        return insReviewRepo.countByInsId(insId);
    }

    public boolean findByCourseIdStudentId(long courseId, long studentId)
    {
        Optional<InsReview> pagedResult = insReviewRepo.findByCourseIdStudentId(courseId, studentId);
        return pagedResult.isPresent();
    }

    public Iterable<StudentPurchaseDto> findByStudentId(long id,int page,int pageSize)
    {
        Page<StudentPurchaseDto> pagedResult =  insReviewRepo.findByStudentId(id,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else{
            return new ArrayList<>();
        }

    }
    //inserting review to repo
    public InsReview save(InsReview insReview)
    {
        return insReviewRepo.save(insReview);
    }

    public int setReply(InsReview insReview){
        return insReviewRepo.setReply(insReview.getInsId(), insReview.getReply());
    }

    public int addReview(InsReview insReview){
        return insReviewRepo.addReview(insReview.getCourseId(), insReview.getStudentId(), insReview.getReview(), insReview.getRating());
    }


    public void updateReviewById(InsReview insReview)
    {
          insReviewRepo.updateReviewById(insReview.getId(), insReview.getReview(), insReview.getRating());
    }
}
