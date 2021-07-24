package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Respository.InstituteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InstituteService {
    @Autowired
    private InstituteRepo instituteRepo;

    public  Iterable<Institute> getAllInstitute(Integer pageNo,Integer pageSize,String sortBy)
    {

        Pageable paging  = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        Page<Institute> pagedResult = instituteRepo.findAll(paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }

    public  Iterable<Institute> findByCategory(long id,Pageable topTwenty)
    {


        Page<Institute> pagedResult = instituteRepo.findByCategory(id,topTwenty);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }
    public Optional<Institute> findById(long id)
    {
        return instituteRepo.findById(id);
    }

    public Institute save(Institute institute)
    {
        return  instituteRepo.save(institute);
    }

    public Iterable<Institute> searchInstitute(String word,int page,int pageLimit)
    {
         Page<Institute> pagedResult = instituteRepo.findByNameContainingIgnoreCase(word,PageRequest.of(page,pageLimit));
         if(pagedResult.hasContent())
         {
             return pagedResult.getContent();
         }else
         {
             return new ArrayList<>();
         }
    }
}
