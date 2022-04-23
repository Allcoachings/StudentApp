package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.ContactUs;
import com.allcoaching.AllCoachingRestApi.Respository.ContactUsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ContactUsService {

    @Autowired
    private ContactUsRepo contactUsRepo;

    public ContactUs save(ContactUs contactUs)
    {
        return contactUsRepo.save(contactUs);
    }
    public void delete(long id){
        contactUsRepo.deleteById(id);
    }

    public Iterable<ContactUs> fetch(int page,int pageSize)
    {
       Page<ContactUs> pagedResult =  contactUsRepo.findAll(PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"createdAt"));
       if(pagedResult.hasContent())
       {
           return  pagedResult.getContent();
       }else
       {
           return  new ArrayList<>();
       }
    }


}
