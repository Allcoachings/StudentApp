package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@NoArgsConstructor
@ToString
@Data
@Entity
public class FeedPollOptions {

    @Id
    @GeneratedValue
    private long id;

    private String pollOption;

    private  int upVotes;

    private long feedId;

    public FeedPollOptions(String pollOption, int upVotes, long feedId) {
        this.pollOption = pollOption;
        this.upVotes = upVotes;
        this.feedId = feedId;
    }
}
