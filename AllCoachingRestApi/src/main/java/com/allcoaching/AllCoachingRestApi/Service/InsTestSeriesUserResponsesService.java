package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesUserQuestionResponsesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesUserResponseBriefRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InsTestSeriesUserResponsesService {

    @Autowired
    private InsTestSeriesUserResponseBriefRepo userResponseBriefRepo;
    @Autowired
    private InsTestSeriesUserQuestionResponsesRepo questionResponsesRepo;

    public Optional<InsTestSeriesUserResponseBrief> userResponseBriefs(long responseId)
    {

        return userResponseBriefRepo.findById(responseId);
    }

    public InsTestSeriesUserResponseBrief saveUserResponse(InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief)
    {
         InsTestSeriesUserResponseBrief insTestSeriesUserResponseBrief_saved = userResponseBriefRepo.save(insTestSeriesUserResponseBrief);
         insTestSeriesUserResponseBrief_saved.addInsTestSeriesUserQuestionResponses(insTestSeriesUserResponseBrief.getUserQuestionResponses());

        return insTestSeriesUserResponseBrief_saved;
    }
}
