package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Respository.InstituteRepo;
import com.allcoaching.AllCoachingRestApi.dto.InsAccountDto;
import com.allcoaching.AllCoachingRestApi.dto.InsCredentialDto;
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
public  Iterable<Institute> getAllInstituteByStatus(Integer status,Integer pageNo,Integer pageSize,String sortBy)
    {

        Pageable paging  = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        Page<Institute> pagedResult = instituteRepo.findByStatus(status,paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }


    public Optional<Institute> validateIns(InsCredentialDto insCredentialDto)
    {
        return instituteRepo.findByEmailAndPassword(insCredentialDto.getEmail(),insCredentialDto.getPassword());
         
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



    public  void updateStatus(int status, long id)
    {
            instituteRepo.updateStatus(status,id);
    }


    public void deleteIns(long id)
    {
        instituteRepo.deleteById(id);
    }


    public void boostIns(long id,int value)
    {
        instituteRepo.boostIns(id,value);
    }

    //update institute bank details
    public void updateInstituteBankDetails(InsAccountDto insAccountDto)
    {
        instituteRepo.updateInstituteAccountDetails(insAccountDto.getAccountNumber(),insAccountDto.getIfsc(),insAccountDto.getAccountHolderName(),insAccountDto.getBankName(),insAccountDto.getInsId());

    }

    //fetch institute bank details by ins id
    public InsAccountDto fetchAccountDetailsByInsId(long id)
    {

        Optional<Institute> i = instituteRepo.findById(id);
        if(i.isPresent())
        {
            Institute institute = i.get();
            return  new InsAccountDto(institute.getId(),institute.getAccountNumber(),institute.getIfsc(),institute.getAccountHolderName(),institute.getBankName());
        }else
        {
            return null;
        }

    }


    public void updatePushToken(long id,String token)
    {
        instituteRepo.updatePushToken(id,token);
    }
}
