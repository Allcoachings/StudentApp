package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Service.CategoryService;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import com.allcoaching.AllCoachingRestApi.Service.MainBannersService;
import com.allcoaching.AllCoachingRestApi.dto.AppStudentHomeDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/app/home/")
@Api()
public class AppStudentHomeController {

    @Autowired
    private MainBannersService mainBannersService;

    @Autowired
    private InstituteService instituteService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    public List<AppStudentHomeDto> getHomeData()
    {
            List<AppStudentHomeDto> list = new ArrayList<>();
            Iterable<Category> categories = categoryService.findAll();
            Pageable topTwenty = PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC,"boostValue","totalRating"));
            categories.forEach(item->{
                list.add(new AppStudentHomeDto(item.getName(),"listing",item.getId(),instituteService.findByCategory(item.getId(),topTwenty)));
            });

            Iterable<MainBanners> mainBannerRow1 = mainBannersService.findByPlaceholder("home1");
            Iterable<MainBanners> mainBannerRow2 = mainBannersService.findByPlaceholder("home2");
            list.add(0,new AppStudentHomeDto("","banner",0,mainBannerRow1));
            list.add(4,new AppStudentHomeDto("","banner",0,mainBannerRow2));
            return list;
    }
}
