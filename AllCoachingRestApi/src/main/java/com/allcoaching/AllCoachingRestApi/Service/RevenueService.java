package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RevenueService {

  @Autowired
  private InsReviewService     insReviewService;

  @Autowired
  private CourseService courseService;

  public long findTotalInsRevenue(long ins)
  {
      Iterable<InsReview> insReviewList = insReviewService.findAllByInsId(ins);
//      insReviewList.forEach();


  }






}
