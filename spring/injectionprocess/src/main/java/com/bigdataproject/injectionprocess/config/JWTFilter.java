package com.bigdataproject.injectionprocess.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        String headerAuth = req.getHeader("Authorization");
//        if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
        if (headerAuth == null || !headerAuth.equals("test")) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            PrintWriter out = res.getWriter();
            out.println("인증 안됨");
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
