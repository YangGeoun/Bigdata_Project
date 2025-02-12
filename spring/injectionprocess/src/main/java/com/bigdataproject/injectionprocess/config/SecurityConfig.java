package com.bigdataproject.injectionprocess.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(corsFilter)
//                .addFilterBefore(new JWTFilter(), AuthenticationFilter.class)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/user/**").permitAll()   // "/user/**" URL은 모두 허용
                        .requestMatchers("/python/**").permitAll()   // "/user/**" URL은 모두 허용
                        .requestMatchers("/admin/**").hasRole("ADMIN") // "/admin/**" URL은 ADMIN 권한 필요
                        .anyRequest().authenticated()                 // 그 외의 요청은 인증 필요
                )
                .httpBasic(Customizer.withDefaults());

        // SecurityFilterChain 빌드 후 등록
        return http.build();
    }
}
