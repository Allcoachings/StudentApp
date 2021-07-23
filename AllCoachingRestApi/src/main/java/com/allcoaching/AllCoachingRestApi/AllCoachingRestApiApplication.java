package com.allcoaching.AllCoachingRestApi;

import com.allcoaching.AllCoachingRestApi.Utils.FileUpload;
import com.allcoaching.AllCoachingRestApi.Utils.MvcConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileUpload.class
})
public class AllCoachingRestApiApplication  {

	public static void main(String[] args) {
		SpringApplication.run(AllCoachingRestApiApplication.class, args);
	}

}
