package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.InsSubscription;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.InsSubscriptionRepo;
import com.allcoaching.AllCoachingRestApi.dto.SubscriptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InsSubscriptionService {

    @Autowired
    private InsSubscriptionRepo insSubscriptionRepo;

    public InsSubscription subscribsIns(InsSubscription insSubscription)
    {

           InsSubscription insSubscription_saved =   insSubscriptionRepo.save(insSubscription);
           insSubscriptionRepo.increaseInstituteFollowers(insSubscription_saved.getInsId());
           return insSubscription_saved;
    }
    public void unsubscribe(InsSubscription insSubscription)
    {

           insSubscriptionRepo.deleteByStudentIdAndInsId(insSubscription.getStudentId(),insSubscription.getInsId());
           insSubscriptionRepo.decreaseInstituteFollowers(insSubscription.getInsId());

    }

    public Optional<InsSubscription> checkSubscription(InsSubscription insSubscription)
    {

        Optional<InsSubscription> insSubscription_checked= insSubscriptionRepo.findByStudentIdAndInsId(insSubscription.getStudentId(),insSubscription.getInsId());
        return insSubscription_checked;

    }


    public void updateIsNotificationsOn(long studentId,long insId,boolean status)
    {
        insSubscriptionRepo.updateIsNotificationsOn(studentId,insId,status);
    }
    public Iterable<SubscriptionDto> getStudentSubscriptionList(long studentId,int page,int pageSize)
    {
        Page<SubscriptionDto> pagedResult = insSubscriptionRepo.findStudentSubscriptionList(studentId, PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }

    public Iterable<Student> getInstituteSubscriptionList(long insId,int page,int pageSize)
    {
        Page<Student> pagedResult = insSubscriptionRepo.findInsSubscriptionList(insId, PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }
    public List<Long> getInsFollowerStudentIds(long id)
    {
        return insSubscriptionRepo.getInsFollowerStudentIds(id);
    }
}
