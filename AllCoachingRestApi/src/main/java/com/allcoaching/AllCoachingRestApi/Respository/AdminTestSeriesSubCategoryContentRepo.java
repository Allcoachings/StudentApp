package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminTestSeriesSubCategoryContentRepo extends PagingAndSortingRepository<AdminTestSeriesSubCategoryContent,Long> {



    Page<AdminTestSeriesSubCategoryContent> findAllByTestSeriesSubCategoryId(long id, Pageable page);



}
