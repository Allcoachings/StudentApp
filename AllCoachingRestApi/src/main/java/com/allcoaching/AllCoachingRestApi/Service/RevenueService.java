package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.dto.SalesOverViewDataDto;
import com.allcoaching.AllCoachingRestApi.dto.SalesWithRevenueOverView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RevenueService {

  @Autowired
  private InsReviewService insReviewService;

  @Autowired
  private CourseService courseService;

  public SalesWithRevenueOverView getSalesOverview(long insId)
  {
      Iterable<SalesOverViewDataDto> salesOverViewDataDtos = insReviewService.salesOverViewDataData(insId);
    final float[] sum = {0};
    final long[] count = {0};
       salesOverViewDataDtos.forEach(item->{
         count[0]++;
         Course c = courseService.findById(item.getCourseId()).get();
         float courseRevenue = (c.getFees()*item.getTotal());
         sum[0] = sum[0] +courseRevenue;
         item.setCourseFee(c.getFees());
         item.setTotalCourseRevenue(courseRevenue);
         item.setCourseName(c.getTitle());

       });
    SalesWithRevenueOverView salesWithRevenueOverView = new SalesWithRevenueOverView(salesOverViewDataDtos,count[0],sum[0]);
      return  salesWithRevenueOverView;


  }







}
