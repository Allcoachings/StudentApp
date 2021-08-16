package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.AdminBlogs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdminBlogRepo extends PagingAndSortingRepository<AdminBlogs,Long> {


    @Override
    Page<AdminBlogs> findAll(Pageable pageable);
}
