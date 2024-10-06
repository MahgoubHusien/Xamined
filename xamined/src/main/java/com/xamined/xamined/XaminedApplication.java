package com.xamined.xamined;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.ai.autoconfigure.vectorstore.mongo.MongoDBAtlasVectorStoreAutoConfiguration.class})
public class XaminedApplication {

	public static void main(String[] args) {
		SpringApplication.run(XaminedApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // This allows all endpoints
						.allowedOrigins("http://localhost:3000") // Allow requests from your frontend URL
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
						.allowedHeaders("*") // Allow any headers
						.allowCredentials(true); // Allow credentials (if needed)
			}
		};
	}
}
