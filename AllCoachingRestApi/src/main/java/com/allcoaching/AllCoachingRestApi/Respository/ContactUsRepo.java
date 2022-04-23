package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.ContactUs;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ContactUsRepo  extends PagingAndSortingRepository<ContactUs,Long> {
}
