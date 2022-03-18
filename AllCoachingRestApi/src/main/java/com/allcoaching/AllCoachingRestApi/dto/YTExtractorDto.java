package com.allcoaching.AllCoachingRestApi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class YTExtractorDto {


    @JsonProperty("vcodec")
    private String vcodec;
    @JsonProperty("tbr")
    private String tbr;
    @JsonProperty("url")
    private String url;
    @JsonProperty("width")
    private String width;
    @JsonProperty("protocol")
    private String protocol;
    @JsonProperty("height")
    private String height;
    @JsonProperty("ext")
    private String ext;
    @JsonProperty("manifest_url")
    private String manifest_url;
    @JsonProperty("format")
    private String format;
    @JsonProperty("format_id")
    private String format_id;
    @JsonProperty("acodec")
    private String acodec;
    @JsonProperty("fps")
    private String fps;

    @JsonProperty("formats")
    private List<YTExtractorDto> formats;


}
