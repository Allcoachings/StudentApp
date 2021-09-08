package com.allcoaching.AllCoachingRestApi.Service;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.InsReviewRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InstituteRepo;
import com.allcoaching.AllCoachingRestApi.dto.*;
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

    @Autowired
    private InstituteRepo instituteRepo;

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

    public   boolean findByCourseIdStudentId(long courseId, long studentId)
    {
        return insReviewRepo.findByCourseIdAndStudentId(courseId, studentId).isPresent();
    }
    public   Optional<InsReview> findByInsIdStudentId(long insId, long studentId)
    {
        return insReviewRepo.findByInsIdAndStudentIdAndReviewNotNull(insId, studentId);
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
        return insReviewRepo.setReply(insReview.getId(), insReview.getReply());
    }

    public int addReview(InsReview insReview){

        switch (insReview.getRating())
        {
            case 1:
                instituteRepo.increaseOneStarCount(insReview.getInsId());

                break;
            case 2:
                instituteRepo.increaseTwoStarCount(insReview.getInsId());
                break;
            case 3:
                instituteRepo.increaseThreeStarCount(insReview.getInsId());
                break;
            case 4:
                instituteRepo.increaseFourStarCount(insReview.getInsId());
                break;
            case 5:
                instituteRepo.increaseFiveStarCount(insReview.getInsId());
                break;
        }
        instituteRepo.increaseTotalRating(insReview.getInsId(),insReview.getRating());
        instituteRepo.increaseTotalRatingCount(insReview.getInsId());
        return insReviewRepo.addReview(insReview.getCourseId(), insReview.getStudentId(), insReview.getReview(), insReview.getRating());
    }


    public void updateReviewById(InsReview insReview)
    {
        InsReview insReview_old = insReviewRepo.findById(insReview.getId()).get();
        //reversing previously added review changes
        switch (insReview_old.getRating())
        {
            case 1:
                instituteRepo.decreaseOneStarCount(insReview.getInsId());
                break;
            case 2:
                instituteRepo.decreaseTwoStarCount(insReview.getInsId());
                break;
            case 3:
                instituteRepo.decreaseThreeStarCount(insReview.getInsId());
                break;
            case 4:
                instituteRepo.decreaseFourStarCount(insReview.getInsId());
                break;
            case 5:
                instituteRepo.decreaseFiveStarCount(insReview.getInsId());
                break;
        }

        //updating new values
        switch (insReview.getRating())
        {
            case 1:
                instituteRepo.increaseOneStarCount(insReview.getInsId());
                break;
            case 2:
                instituteRepo.increaseTwoStarCount(insReview.getInsId());
                break;
            case 3:
                instituteRepo.increaseThreeStarCount(insReview.getInsId());
                break;
            case 4:
                instituteRepo.increaseFourStarCount(insReview.getInsId());
                break;
            case 5:
                instituteRepo.increaseFiveStarCount(insReview.getInsId());
                break;
        }
        instituteRepo.increaseTotalRating(insReview.getInsId(),insReview.getRating()-insReview_old.getRating());

          insReviewRepo.updateReviewById(insReview.getId(), insReview.getReview(), insReview.getRating());
    }


    public  Iterable<SalesOverViewDataDto> salesOverViewDataData(long insId)
    {
        return  insReviewRepo.findAllGroupedByCourseId(insId);
    }

    public Iterable<InsLeadsStudentDto> findStudentList(long courseId,int page,int pageSize)
    {
        Page<InsLeadsStudentDto> paged_result = insReviewRepo.findByCourseId(courseId,PageRequest.of(page,pageSize));
        if (paged_result.hasContent())
        {
            return paged_result.getContent();
        }else
        {
            return  new ArrayList<>();
        }
    }



    //graph data methods for ins data
//weekly
    public Iterable<Graph2dDataDto> getGraphDataWeekly(long insId, int dataTime)
    {
        return insReviewRepo.getGraphDataWeekly(insId,dataTime);
    }
    //monthly
    public  Iterable<Graph2dDataDto> getGraphDataMontly(long insId,int dataTime)
    {
        return insReviewRepo.getGraphDataMontly(insId,dataTime);
    }
    //yearly
    public Iterable<Graph2dDataDto> getGraphDataYearly(long insId,int dataTime)
    {
        return insReviewRepo.getGraphDataYearly(insId);
    }

    //graph data methods for ins data
//weekly
    public Iterable<Graph2dDataDto> adminRevenueGraphDataWeekly( int dataTime)
    {
        return insReviewRepo.adminRevenueGraphDataWeekly(dataTime);
    }
    //monthly
    public  Iterable<Graph2dDataDto> adminRevenueGraphDataMonthly(int dataTime)
    {
        return insReviewRepo.adminRevenueGraphDataMonthly(dataTime);
    }
    //yearly
    public Iterable<Graph2dDataDto> adminRevenueGraphDataYearly(int dataTime)
    {
        return insReviewRepo.adminRevenueGraphDataYearly();
    }

}
