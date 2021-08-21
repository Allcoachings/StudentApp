package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSeriesSubCategoryContentRepo;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

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

     public void deleteById(long id)
     {
         adminTestSeriesSubCategoryContentRepo.deleteById(id);
     }



}
