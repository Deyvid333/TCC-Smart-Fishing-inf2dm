package com.itb.inf2dm.smartfishingd;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "http://localhost:5173",
                            "http://localhost:3000",
                            "https://special-umbrella-r49pj9qjw7625gxg-5173.app.github.dev",
                            "https://special-umbrella-r49pj9qjw7625gxg-5174.app.github.dev",
                            "https://special-umbrella-r49pj9qjw7625gxg-5175.app.github.dev",
                            "https://special-umbrella-r49pj9qjw7625gxg-5176.app.github.dev"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }
}
