package com.cardconnect.backend.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String authHeader = request.getHeader("Authorization");

        System.out.println("📩 Request Path: " + path);
        System.out.println("🔍 Auth Header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("🔴 No Authorization header or wrong format");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        System.out.println("🟡 Extracted Token: " + token);

        if (!jwtUtil.isTokenValid(token)) {
            System.out.println("🔴 Invalid token — rejecting with 403");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        String userId = jwtUtil.extractUserId(token);
        System.out.println("🟢 Token valid ✅, extracted userId: " + userId);

        // ✅ This is what was missing:
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userId, // can be UserDetails or just userId
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")) // or use jwt claim if available
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("✅ SecurityContext updated with authenticated user");

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.equals("/api/user-accounts/login") ||
                path.equals("/api/user-accounts/signup") ||
                path.equals("/api/user-accounts/verify-student");
    }
}