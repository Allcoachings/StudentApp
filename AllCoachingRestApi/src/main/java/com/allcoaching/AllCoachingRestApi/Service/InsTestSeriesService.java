package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.CourseDocument;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeries;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesPlaylist;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesQuestionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InsTestSeriesRepo;
import com.allcoaching.AllCoachingRestApi.Respository.TestSeriesPlaylistRepo;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesAndUserResponseDto;
import com.allcoaching.AllCoachingRestApi.dto.TestSeriesQuestionDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.text.html.HTML;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InsTestSeriesService {

    @Autowired
    private InsTestSeriesRepo insTestSeriesRepo;

    @Autowired
    private  CourseService courseService;
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
        Iterable<InsTestSeriesQuestions>  insTestSeriesQuestions = insTestSeriesQuestionsRepo.saveAll(insTestSeriesQuestionsList);
          ArrayList<InsTestSeriesQuestions> i  = (ArrayList<InsTestSeriesQuestions>) insTestSeriesQuestionsList;
            updateQuestionCount(i.size(),i.get(0).getTestSeriesId());
        return insTestSeriesQuestions;
    }
    public InsTestSeriesQuestions saveSeriesQuestionOneByOne(InsTestSeriesQuestions insTestSeriesQuestion)
    {
//        insTestSeriesQuestion.setQuestion(Jsoup.parse(insTestSeriesQuestion.getQuestion()).text());
//        System.out.println(insTestSeriesQuestion.getQuestion());
        InsTestSeriesQuestions insTestSeriesQuestions =  insTestSeriesQuestionsRepo.save(insTestSeriesQuestion);
        updateQuestionCountByOne(insTestSeriesQuestions.getTestSeriesId());
        return insTestSeriesQuestions;
    }

    //fetching test seriesId  by course id
    public Iterable<InsTestSeries> getTestSeriesByCourseID(long id,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByCourseIdAndIsAdmin(id,false,PageRequest.of(page,pageSize )));
    }

    //fetching test seriesId  by course id and hidden parameter
    public Iterable<InsTestSeries> getTestSeriesByCourseIDAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByCourseIdAndIsAdminAndHidden(id,false,hidden,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"date","time") )));
    }
    //fetching test seriesId  by playlist id
    public Iterable<InsTestSeries> getTestSeriesByPlaylistID(long id,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByPlaylistIdAndIsAdmin(id,false,PageRequest.of(page,pageSize)));
    }

    //fetching test seriesId  by playlist id
    public Iterable<TestSeriesAndUserResponseDto> getTestSeriesByPlaylistIDWithUserResponse(long userId, long playlistId, int page, int pageSize)
    {
      Page<TestSeriesAndUserResponseDto> pagedResult = insTestSeriesRepo.getTestSeriesByPlaylistIDWithUserResponse(userId,playlistId,false,PageRequest.of(page,pageSize));
      if(pagedResult.hasContent())
      {
          return pagedResult.getContent();
      }else
      {
          return new ArrayList<>();
      }
    }

    //fetching test seriesId  by course id with user Response
    public Iterable<TestSeriesAndUserResponseDto> getTestSeriesByCourseIdAndIsAdminWithUserResponse(long userId, long courseId, int page, int pageSize)
    {
      Page<TestSeriesAndUserResponseDto> pagedResult = insTestSeriesRepo.getTestSeriesByCourseIdAndIsAdminWithUserResponse(userId,courseId,false,PageRequest.of(page,pageSize));
      if(pagedResult.hasContent())
      {
          return pagedResult.getContent();
      }else
      {
          return new ArrayList<>();
      }
    }
    //fetching test seriesId  by playlist id and hidden parameter
    public Iterable<InsTestSeries> getTestSeriesByPlaylistIDAndHidden(long id,boolean hidden,int page,int pageSize)
    {
        return extractDataFromPage(insTestSeriesRepo.findByPlaylistIdAndIsAdminAndHidden(id,false,hidden,PageRequest.of(page,pageSize)));

    }

    public Iterable<TestSeriesQuestionDto> getSeriesQuestion(long id, int page, int pageSize)
    {
        Page<TestSeriesQuestionDto> pagesResult = insTestSeriesQuestionsRepo.findByTestSeriesId(id, PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"createdAt")));
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
    public Iterable<TestSeriesAndUserResponseDto> findByCategoryAndIsAdminForUser(long userId,long category,int page,int pageSize)
    {
        Page<TestSeriesAndUserResponseDto> pagedResult =insTestSeriesRepo.findByCategoryAndIsAdminAndStudentId(category,true,userId,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }
        else
        {
            return new ArrayList<>();
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
        if(!status)
        {
            InsTestSeries  insTestSeries= findById(id).get();
            long courseId = insTestSeries.getCourseId();
            if(!insTestSeries.isAdmin())
            {
                courseService.sendNotificationAsync(courseId,"Test Series  "+insTestSeries.getTitle()+" published ");
            }


        }
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
        Optional<InsTestSeriesQuestions> insTestSeriesQuestions = insTestSeriesQuestionsRepo.findById(id);
        if(insTestSeriesQuestions.isPresent())
        {
            insTestSeriesQuestionsRepo.deleteById(id);
            decreaseQuestionCountByOne(insTestSeriesQuestions.get().getTestSeriesId());
        }

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

    //fetching test series playlist by course id
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


    }//update api to update direct question details by id
    public void updateQuestionDetails(String exp,String correctOpt, long qid)
    {
         insTestSeriesQuestionsRepo.updateQuestionDetails(correctOpt,exp,qid);


    }

    //to update questionCount by one
    public  void updateQuestionCountByOne(long id)
    {
        insTestSeriesRepo.updateQuestionCountByOne(id);
    }

    //to decrease questionCount by one
    public  void decreaseQuestionCountByOne(long id)
    {
        insTestSeriesRepo.decreaseQuestionCountByOne(id);
    }

    //to update questionCount
    public  void updateQuestionCount(int count,long id)
    {
        insTestSeriesRepo.updateQuestionCount(count,id);
    }

    //updating hidden Status
    public void updateDemoStatusById(boolean status,long id)
    {
        insTestSeriesRepo.updateDemoStatus(status,id);
    }


}
