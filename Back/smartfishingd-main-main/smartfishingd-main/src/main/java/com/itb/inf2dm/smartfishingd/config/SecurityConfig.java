package com.itb.inf2dm.smartfishingd.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.itb.inf2dm.smartfishingd.security.JwtAuthenticationFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/v1/pesqueiro/pendentes").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/pesqueiro/*/aprovar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/pesqueiro/*/negar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/comentario").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/v1/comentario/*").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/v1/comentario/*").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/v1/favorito").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/favorito").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/v1/favorito/pesqueiro/*").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/v1/historico").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/historico").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}