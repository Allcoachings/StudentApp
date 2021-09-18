package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesQuestionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.TestSeriesPlaylistRepo;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto;
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
        return testSeriesPlaylistRepo.playListContent(id,false);
    }


    public InsTestSeries createTestSeries(InsTestSeries insTestSeries)
    {
        return insTestSeriesRepo.save(insTestSeries);
    }

    public Iterable<InsTestSeriesQuestions> saveSeriesQuestions(Iterable<InsTestSeriesQuestions> insTestSeriesQuestionsList)
    {
        return insTestSeriesQuestionsRepo.saveAll(insTestSeriesQuestionsList);
    }
    public InsTestSeriesQuestions saveSeriesQuestionOneByOne(InsTestSeriesQuestions insTestSeriesQuestion)
    {
        return insTestSeriesQuestionsRepo.save(insTestSeriesQuestion);
    }

    public Iterable<InsTestSeries> getTestSeriesByCourseID(long id,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByCourseIdAndIsAdmin(id,false,PageRequest.of(page,pageSize )));
    }

    public Iterable<InsTestSeries> getTestSeriesByPlaylistID(long id,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByPlaylistIdAndIsAdmin(id,false,PageRequest.of(page,pageSize)));
    }

    public Iterable<TestSeriesQuestionDto> getSeriesQuestion(long id, int page, int pageSize)
    {
        Page<TestSeriesQuestionDto> pagesResult = insTestSeriesQuestionsRepo.findByTestSeriesId(id, PageRequest.of(page,pageSize));
        if(pagesResult.hasContent())
        {
            return  pagesResult.getContent();
        }
        return new ArrayList<TestSeriesQuestionDto>();
    }


    public Optional<InsTestSeries> findById(long id)
    {

        System.out.println("testseriesId"+id);
        return insTestSeriesRepo.findById(id);
    }

    public Iterable<InsTestSeries> findByCategoryAndIsAdmin(long category,int page,int pageSize)
    {
        Page<InsTestSeries> pagedResult =insTestSeriesRepo.findByCategoryAndIsAdmin(category,true,PageRequest.of(page,pageSize));
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


    //updating published Status
    public void updatePublishedStatusById(boolean status,long id)
    {
        insTestSeriesRepo.updatePublishedStatus(status,id);
    }

    //updating hidden Status
    public void updateHiddenStatusById(boolean status,long id)
    {
        insTestSeriesRepo.updateHiddenStatus(status,id);
    }

    //updating playlist id
    public void updatePlaylistIdById(long playlistId,long id)
    {
        insTestSeriesRepo.updatePlaylistId(playlistId,id);
    }
    //delete whole test series
    public void deleteSeriesById(long id)
    {
        insTestSeriesRepo.deleteById(id);
    }
    //delete single question of test series
    public void deleteSeriesQuestionById(long id)
    {
        insTestSeriesQuestionsRepo.deleteById(id);
    }

    //delete playlist
    public void  deleteTestSeriesPlaylistById(long playlistId)
    {
        testSeriesPlaylistRepo.deleteById(playlistId);
    }
    //count course testSeries
    public long countCourseTestSeries(long id)
    {
        return insTestSeriesRepo.countByCourseId(id);
    }

    public  Iterable<InsTestSeriesPlaylist> findPlaylistByCourseId(long courseId)
    {
        return testSeriesPlaylistRepo.findByCourseId(courseId);
    }


    public Iterable<InsTestSeries> extractDataFromPage(Page<InsTestSeries> transactionPage)
    {
        if(transactionPage.hasContent())
        {
            return transactionPage.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }


    //update api to update direct column and its value by id
    public void updateQuestionData(String fieldValue,String fieldName,int fieldDbType,long qid)
    {
        switch (fieldName)
        {
            case "question":
                insTestSeriesQuestionsRepo.updateQuestionField(fieldValue,fieldDbType,qid);
                break;
            case "optionA":
                insTestSeriesQuestionsRepo.updateOptionAField(fieldValue,fieldDbType,qid);
                break;
            case "optionB":
                insTestSeriesQuestionsRepo.updateOptionBField(fieldValue,fieldDbType,qid);
                break;
            case "optionC":
                insTestSeriesQuestionsRepo.updateOptionCField(fieldValue,fieldDbType,qid);
                break;
            case "optionD":
                insTestSeriesQuestionsRepo.updateOptionDField(fieldValue,fieldDbType,qid);
                break;
        }


    }
}
