package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedCategory;
import com.allcoaching.AllCoachingRestApi.Respository.FeedCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeedCategoryService {

    @Autowired
    private FeedCategoryRepo feedCategoryRepo;

    //fetch feed categories

    public Iterable<FeedCategory> findAll()
    {
        return    feedCategoryRepo.findAll();
    }

    //saving feed Category
    public FeedCategory save(FeedCategory feedCategory)
    {
        return feedCategoryRepo.save(feedCategory);
    }

    //find by category id
    public Optional<FeedCategory> findById(long id)
    {
        return feedCategoryRepo.findById(id);
    }
}
