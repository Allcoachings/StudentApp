package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesQuestionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.TestSeriesPlaylistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InsTestSeriesService {

    @Autowired
    private InsTestSeriesRepo insTestSeriesRepo;

    @Autowired
    private InsTestSeriesQuestionsRepo insTestSeriesQuestionsRepo;

    @Autowired
    private TestSeriesPlaylistRepo testSeriesPlaylistRepo;

    public InsTestSeriesPlaylist createTestSeriesPlaylist(InsTestSeriesPlaylist insTestSeriesPlaylist)
    {
        return  testSeriesPlaylistRepo.save(insTestSeriesPlaylist);
    }

    public Iterable<InsTestSeries> getTestSeriesByPlaylistId(long id)
    {
        return testSeriesPlaylistRepo.playListContent(id);
    }


    public InsTestSeries createTestSeries(InsTestSeries insTestSeries)
    {
        return insTestSeriesRepo.save(insTestSeries);
    }

    public Iterable<InsTestSeriesQuestions> saveSeriesQuestions(Iterable<InsTestSeriesQuestions> insTestSeriesQuestionsList)
    {
        return insTestSeriesQuestionsRepo.saveAll(insTestSeriesQuestionsList);
    }

    public Iterable<InsTestSeries> getTestSeriesByCourseID(long id)
    {
        return insTestSeriesRepo.findByCourseId(id);
    }

    public Iterable<InsTestSeriesQuestions> getSeriesQuestion(long id,int page,int pageSize)
    {
        Page<InsTestSeriesQuestions> pagesResult = insTestSeriesQuestionsRepo.findByTestSeriesId(id, PageRequest.of(page,pageSize));
        if(pagesResult.hasContent())
        {
            return  pagesResult.getContent();
        }
        return new ArrayList<InsTestSeriesQuestions>();
    }


    public Optional<InsTestSeries> findById(long id)
    {
        return insTestSeriesRepo.findById(id);
    }

    public Iterable<InsTestSeries> findByCategoryAndIsAdmin(long category,boolean isAdmin,int page,int pageSize)
    {
        Page<InsTestSeries> pagedResult =insTestSeriesRepo.findByCategoryAndIsAdmin(category,isAdmin,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }
        else
        {
            return new ArrayList<InsTestSeries>();
        }
    }
    public Iterable<InsTestSeries> findByIsAdmin(boolean isAdmin,int page,int pageSize)
    {
        Page<InsTestSeries> pagedResult =insTestSeriesRepo.findByIsAdmin(isAdmin,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }
        else
        {
            return new ArrayList<InsTestSeries>();
        }
    }
}
