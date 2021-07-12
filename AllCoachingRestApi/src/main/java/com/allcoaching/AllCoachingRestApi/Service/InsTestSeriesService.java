package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.TestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesQuestionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.TestSeriesPlaylistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Iterable<InsTestSeriesQuestions> getSeriesQuestion(long id)
    {
        return insTestSeriesQuestionsRepo.findByTestSeriesId(id);
    }
}
