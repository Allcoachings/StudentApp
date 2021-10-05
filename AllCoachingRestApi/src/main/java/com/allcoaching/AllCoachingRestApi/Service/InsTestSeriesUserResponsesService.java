package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesUserQuestionResponsesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesUserResponseBriefRepo;
import com.allcoaching.AllCoachingRestApi.dto.StudentResponseBriefDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InsTestSeriesUserResponsesService {

    @Autowired
    private InsTestSeriesUserResponseBriefRepo userResponseBriefRepo;
    @Autowired
    private InsTestSeriesUserQuestionResponsesRepo questionResponsesRepo;



    //count rank
    public long countRankBy(long testSeriesId,long score)
    {
        return  userResponseBriefRepo.countByTestSeriesIdAndScoreGreaterThanEqual(testSeriesId,score);
    }

    //count students below a particular score
    public int belowScore(long testSeriesId,long score)
    {
        return  userResponseBriefRepo.countByTestSeriesIdAndScoreLessThan(testSeriesId,score);
    }
    //count students below a particular score
    public int totalStudents(long testSeriesId)
    {
        return  userResponseBriefRepo.countByTestSeriesId(testSeriesId);
    }
    //fetch response from db by id
    public Optional<InsTestSeriesUserResponseBrief> userResponseBriefs(long responseId)
    {

        return userResponseBriefRepo.findById(responseId);
    }

    //save response to db
    public InsTestSeriesUserResponseBrief saveUserResponse(InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief)
    {
         InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief_saved = userResponseBriefRepo.save(insTestSeriesUserResponseBrief);


        return insTestSeriesUserResponseBrief_saved;
    }


    public  Iterable<StudentResponseBriefDto> findStudentListOrderByRank(long testSeriesId,int offset,int dataLimit)
    {
        Page<StudentResponseBriefDto> paged_result = userResponseBriefRepo.findByTestSeriesId(testSeriesId, PageRequest.of(offset,dataLimit, Sort.by(Sort.Direction.ASC,"rank")));
        if(paged_result.hasContent())
        {
            return paged_result.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }
}
