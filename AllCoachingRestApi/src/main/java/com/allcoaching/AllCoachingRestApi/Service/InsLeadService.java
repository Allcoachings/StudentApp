package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.InsLeads;
import com.allcoaching.AllCoachingRestApi.Respository.InsLeadsRepo;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InsLeadService {

    @Autowired
    private InsLeadsRepo insLeadsRepo;


    public InsLeads addLead(InsLeads insLeads)
    {
        Optional<InsLeads> insLeads_check =  insLeadsRepo.findByCourseIdAndInsIdAndUserId(insLeads.getCourseId(),insLeads.getInsId(),insLeads.getUserId());
        return insLeads_check.orElseGet(() -> insLeadsRepo.save(insLeads));
    }

    public Iterable<InsLeadsDto> InsLeadsInfo(long insId,int page,int pageSize)
    {

        Page<InsLeadsDto> pagedResult = insLeadsRepo.findAllByInsId(insId, PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return pagedResult.getContent();
        }else
        {
            return  new ArrayList<>();
        }
    }

    public Iterable<InsLeadsStudentDto> InsCourseLeadList(long courseId,int page,int pageSize)
    {

          Page<InsLeadsStudentDto> pagedResult = insLeadsRepo.findAllByCourseId(courseId,PageRequest.of(page,pageSize));
          if(pagedResult.hasContent())
          {
                return  pagedResult.getContent();
          }else
          {
              return  new ArrayList<>();
          }

    }

    //counting total leads of a institute
    public long countLeadsOf(long institute)
    {
        return insLeadsRepo.countByInsId(institute);
    }


//graph data methods for ins data
//weekly
    public Iterable<Graph2dDataDto> getGraphDataWeekly(long insId,int dataTime)
    {
        return insLeadsRepo.getGraphDataWeekly(insId,dataTime);
    }
//monthly
    public  Iterable<Graph2dDataDto> getGraphDataMontly(long insId,int dataTime)
    {
        return insLeadsRepo.getGraphDataMontly(insId,dataTime);
    }
//yearly
    public Iterable<Graph2dDataDto> getGraphDataYearly(long insId,int dataTime)
    {
            return insLeadsRepo.getGraphDataYearly(insId);
    }

//graph data methods for ins data
//weekly
    public Iterable<Graph2dDataDto> adminLeadGraphDataWeekly( int dataTime)
    {
        return insLeadsRepo.adminLeadGraphDataWeekly(dataTime);
    }
//monthly
    public  Iterable<Graph2dDataDto> adminLeadGraphDataMonthly(int dataTime)
    {
        return insLeadsRepo.adminLeadGraphDataMonthly(dataTime);
    }
//yearly
    public Iterable<Graph2dDataDto> adminLeadGraphDataYearly(int dataTime)
    {
            return insLeadsRepo.adminLeadGraphDataYearly();
    }


}
