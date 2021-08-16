package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.AdminBlogs;
import com.allcoaching.AllCoachingRestApi.Respository.AdminBlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Optional;

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

    public  Iterable<AdminBlogs> findAll(int offset,int limit)
    {
            Page<AdminBlogs>  pagedAdminBlogs =  adminBlogRepo.findAll(PageRequest.of(offset, limit));
            if(pagedAdminBlogs.hasContent())
            {
                return  pagedAdminBlogs.getContent();
            }else
            {
                return new ArrayList<AdminBlogs>();
            }

    }

    public Optional<AdminBlogs> findById(long id)
    {
        return  adminBlogRepo.findById(id);
    }


}
