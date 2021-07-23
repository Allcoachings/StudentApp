package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSeriesSubCategoryContentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;

@Service
public class AdminTestSeriesSubCategoryContentService {

     @Autowired
    private AdminTestSeriesSubCategoryContentRepo adminTestSeriesSubCategoryContentRepo;

     public  AdminTestSeriesSubCategoryContent addSubCategoryItem(AdminTestSeriesSubCategoryContent adminTestSeriesSubCategoryContent)
     {
            return adminTestSeriesSubCategoryContentRepo.save(adminTestSeriesSubCategoryContent);
     }


     public Iterable<AdminTestSeriesSubCategoryContent> findAllContentBySubCategory(int page,int pageSize,long subCategoryId)
     {
          Page<AdminTestSeriesSubCategoryContent> pagedResult =  adminTestSeriesSubCategoryContentRepo.findAllByTestSeriesSubCategoryId(subCategoryId, PageRequest.of(page,pageSize));
          if(pagedResult.hasContent())
          {
              return pagedResult.getContent();
          }else
          {
              return new ArrayList<>();
          }

     }
}