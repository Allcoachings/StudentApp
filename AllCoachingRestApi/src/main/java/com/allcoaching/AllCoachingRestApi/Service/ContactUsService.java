package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.ContactUs;
import com.allcoaching.AllCoachingRestApi.Respository.ContactUsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}
