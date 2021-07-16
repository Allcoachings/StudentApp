package com.allcoaching.AllCoachingRestApi.dto;


import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Optional;

@Data
@ToString
@NoArgsConstructor
public class FeedDto {

    private FeedContentDto feed;
    private Optional posterObject;

    public FeedDto(FeedContentDto feed, Optional posterObject) {
        this.feed = feed;
        this.posterObject = posterObject;
    }

    public FeedDto(FeedContentDto feed) {
        this.feed = feed;
    }
}
