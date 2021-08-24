package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.FeedComments;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Optional;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FeedCommentDto {
    private FeedComments feedComments;
    private Optional commenterObject;
}
