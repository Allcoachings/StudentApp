package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.AdminBlogs;
import com.allcoaching.AllCoachingRestApi.Respository.AdminBlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminBlogService {

    @Autowired
    private AdminBlogRepo adminBlogRepo;

    public AdminBlogs addBlog(AdminBlogs adminBlogs)
    {
        return adminBlogRepo.save(adminBlogs);
    }

    public void deleteBlog(long id)
    {
         adminBlogRepo.deleteById(id);
    }


}
