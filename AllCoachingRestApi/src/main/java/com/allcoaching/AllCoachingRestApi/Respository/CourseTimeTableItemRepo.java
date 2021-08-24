package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
public interface CourseTimeTableItemRepo extends CrudRepository<CourseTimeTableItem,Long> {
    List<CourseTimeTableItem> findByInsIdAndDateTimeGreaterThanOrderByDateTimeAsc(long insId, Timestamp dateTime);

}
