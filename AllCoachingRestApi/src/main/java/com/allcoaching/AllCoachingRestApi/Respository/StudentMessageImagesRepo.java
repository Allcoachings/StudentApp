package com.allcoaching.AllCoachingRestApi.Respository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentMessageImagesRepo extends PagingAndSortingRepository<com.allcoaching.AllCoachingRestApi.Entity.StudentMessageImages,Long>
{

}
