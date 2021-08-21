package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@Entity
public class FeedImages {

    @GeneratedValue
    @Id
    private long id;
    private long feedId;

    private String feedImage;

    public FeedImages(long feedId, String feedImage) {
        this.feedId = feedId;
        this.feedImage = feedImage;
    }

    public FeedImages(String feedImage) {
        this.feedImage = feedImage;
    }
}
