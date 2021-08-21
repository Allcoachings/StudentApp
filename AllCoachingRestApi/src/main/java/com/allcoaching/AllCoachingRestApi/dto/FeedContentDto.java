package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedImages;
import com.allcoaching.AllCoachingRestApi.Entity.FeedPollOptions;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class FeedContentDto {
    private Feed feed;
    private Iterable<FeedPollOptions> feedPollOptions;
    private Iterable<FeedImages> feedImages;

    public FeedContentDto(Feed feed) {
        this.feed = feed;
    }

    public FeedContentDto(Feed feed, Iterable<FeedPollOptions> feedPollOptions) {
        this.feed = feed;
        this.feedPollOptions = feedPollOptions;
    }

}
