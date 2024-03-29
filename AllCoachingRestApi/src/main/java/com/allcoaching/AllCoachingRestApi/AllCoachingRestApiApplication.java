package com.allcoaching.AllCoachingRestApi;

import com.allcoaching.AllCoachingRestApi.Utils.FileUpload;
import com.allcoaching.AllCoachingRestApi.Utils.MvcConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@SpringBootApplication
@EnableConfigurationProperties({
		FileUpload.class
})
@EnableAsync
public class AllCoachingRestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AllCoachingRestApiApplication.class, args);
	}


	@Bean
	public Executor asyncExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("Stackoverflow-");
		executor.initialize();
		return executor;
	}
}