package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.StudentHistory;
import com.allcoaching.AllCoachingRestApi.Respository.CourseDocumentRepo;
import com.allcoaching.AllCoachingRestApi.Respository.StudentHistoryRepo;
import com.allcoaching.AllCoachingRestApi.dto.StudentHistoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentHistoryService {

    @Autowired
    private StudentHistoryRepo studentHistoryRepo;

    @Autowired
    private CourseDocumentService courseDocumentService;


    @Autowired
    private CourseVideoService courseVideoService;

    @Autowired
    private InsTestSeriesService insTestSeriesService;

    public StudentHistory saveHistory(StudentHistory studentHistory)
    {
        return studentHistoryRepo.save(studentHistory);
    }

    public  Iterable<StudentHistoryDto> findAllByStudentId(long id,String type,int page,int pageSize)
    {
        Page<StudentHistory> pagedResult = studentHistoryRepo.findByStudentIdAndType(id, type,PageRequest.of(page,pageSize));
        if(pagedResult.hasContent())
        {
             Iterable<StudentHistory> studentHistories =  pagedResult.getContent();
             List<StudentHistoryDto> studentHistoryDtos = new ArrayList<>();

             studentHistories.forEach(item->
             {
                 switch (item.getType())
                 {
                     case "document":

                         studentHistoryDtos.add(new StudentHistoryDto(item.getType(),courseDocumentService.findById(item.getItemId())));

                         break;
                     case "video":
                         studentHistoryDtos.add(new StudentHistoryDto(item.getType(),courseVideoService.findById(item.getItemId())));
                         break;
                     case "testSeries":
                         studentHistoryDtos.add(new StudentHistoryDto(item.getType(),insTestSeriesService.findById(item.getItemId())));
                         break;


                 }
             });

             return  studentHistoryDtos;
        }else
        {
            return new ArrayList<StudentHistoryDto>();
        }
    }
}
