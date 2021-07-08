package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Respository.MainBannersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainBannersService {

    @Autowired
    private MainBannersRepo mainBannersRepo;

    //storing banner info in repo
    public MainBanners save(MainBanners mainBanners)
    {
        return mainBannersRepo.save(mainBanners);
    }

    //fetching all the banners from repo
    public Iterable<MainBanners> findAll()
    {
        return mainBannersRepo.findAll();
    }

    //removing stored banner using banner unique id
    public void deleteById(long id)
    {
        mainBannersRepo.deleteById(id);
    }
}
