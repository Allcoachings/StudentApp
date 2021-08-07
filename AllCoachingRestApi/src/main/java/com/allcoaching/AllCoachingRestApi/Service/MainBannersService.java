package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import com.allcoaching.AllCoachingRestApi.Respository.MainBannersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MainBannersService {

    @Autowired
    private MainBannersRepo mainBannersRepo;

    //storing banner info in repo
    public MainBanners save(MainBanners mainBanners)
    {
        return mainBannersRepo.save(mainBanners);
    }

    public Iterable<MainBanners> fetchPagedBanners(int offset,int pageSize)
    {
        Page<MainBanners> pagedResult = mainBannersRepo.findAll(PageRequest.of(offset,pageSize));

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<MainBanners>();
        }
    }

    public MainBanners updateBannerDetails(MainBanners mainBanners)
    {
        return mainBannersRepo.updateBannerDetails(mainBanners.getBannerLink(),mainBanners.getPlaceHolder(),mainBanners.getId());
    }

     public void updateBannerImage(MainBanners mainBanners)
     {
         mainBannersRepo.updateBannerImage(mainBanners.getBannerImageLink(),mainBanners.getId());
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
