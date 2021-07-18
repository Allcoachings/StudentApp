package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.TestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesQuestionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.TestSeriesPlaylistRepo;
import com.fasterxml.jackson.databind.util.ArrayIterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InsTestSeriesService {

    @Autowired
    private InsTestSeriesRepo insTestSeriesRepo;

    @Autowired
    private InsTestSeriesQuestionsRepo insTestSeriesQuestionsRepo;

    @Autowired
    private TestSeriesPlaylistRepo testSeriesPlaylistRepo;

    public TestSeriesPlaylist createTestSeriesPlaylist(TestSeriesPlaylist testSeriesPlaylist)
    {
        return  testSeriesPlaylistRepo.save(testSeriesPlaylist);
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
}
