package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableSubject;
import com.allcoaching.AllCoachingRestApi.Respository.CourseTimeTableItemRepo;
import com.allcoaching.AllCoachingRestApi.Respository.CourseTimeTableSubjectRepo;
import com.allcoaching.AllCoachingRestApi.dto.CourseTimeTableDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseTimeTableService {

    @Autowired
    private CourseTimeTableItemRepo itemRepo;

    @Autowired
    private CourseTimeTableSubjectRepo subjectRepo;

    //inserting timetable subject
    public CourseTimeTableSubject saveSubject(CourseTimeTableSubject courseTimeTableSubject)
    {
        return subjectRepo.save(courseTimeTableSubject);
    }

    //inserting subject item
    public  CourseTimeTableItem saveItem(CourseTimeTableItem courseTimeTableItem)
    {
        return itemRepo.save(courseTimeTableItem);
    }

    //fetching TimeTable by subject id
    public CourseTimeTableDto fetchTimeTable(long id)
    {

        Optional<CourseTimeTableSubject> courseTimeTableSubject = subjectRepo.findById(id);
        if(courseTimeTableSubject.isPresent())
        {
            Iterable<CourseTimeTableItem> courseTimeTableItems =  subjectRepo.findBySubject(id);
            return new CourseTimeTableDto(courseTimeTableSubject.get().getId(),courseTimeTableSubject.get().getName(),courseTimeTableItems);
        }else
        {
            return new CourseTimeTableDto();
        }
    }

    //fetching TimeTable by subject id
    public Iterable<CourseTimeTableDto> fetchCourseTimeTable(long id)
    {

        Iterable<CourseTimeTableSubject> courseTimeTableSubject = subjectRepo.findByCourseId(id);
        List<CourseTimeTableDto> courseTimeTableDtos = new ArrayList<>();
        courseTimeTableSubject.forEach(item->
        {
            Iterable<CourseTimeTableItem> courseTimeTableItems =  subjectRepo.findBySubject(item.getId());
            courseTimeTableDtos.add(new CourseTimeTableDto(item.getId(),item.getName(),courseTimeTableItems));
        });
         return courseTimeTableDtos;
    }


    //delete whole subject
    public void deleteTimeTableSubject(long id)
    {
        subjectRepo.deleteById(id);
    }

    //delete single item of subject
    public void deleteTimeTableSubjectItem(long id)
    {
        itemRepo.deleteById(id);
    }
}
