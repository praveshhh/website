package com.billspay.backend.service;

import com.billspay.backend.dto.*;
import com.billspay.backend.model.User;
import com.billspay.backend.repository.UserRepository;
import com.billspay.backend.security.jwt.JwtUtils;
import com.billspay.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private MailService mailService;

    @Value("${app.auth.otpExpiryMinutes}")
    private int otpExpiryMinutes;

    @Transactional
    public String registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            // If the user exists but is unverified, re-generate OTP and resend
            Optional<User> existingUser = userRepository.findByEmail(signupRequest.getEmail());
            if (existingUser.isPresent() && !existingUser.get().isVerified()) {
                resendOtp(signupRequest.getEmail());
                return "User already registered but unverified. A new verification OTP code has been sent.";
            }
            throw new IllegalArgumentException("Error: Email is already registered!");
        }

        // Generate 6-digit OTP
        String otpCode = generateOtpCode();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(otpExpiryMinutes);

        // Create new user account
        User user = User.builder()
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword()))
                .verified(false)
                .otpCode(otpCode)
                .otpExpiry(expiry)
                .build();

        userRepository.save(user);

        // Send OTP
        mailService.sendOtpEmail(user.getEmail(), otpCode);

        return "User registered successfully. Check your email for verification OTP.";
    }

    @Transactional
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Optional check: If the user is unverified, we still log them in but return unverified status
        // so the frontend can route them to the OTP verification page
        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.isVerified(),
                userDetails.getAuthorities().stream().findFirst().map(a -> a.getAuthority()).orElse("ROLE_USER")
        );
    }

    @Transactional
    public boolean verifyOtp(OtpVerificationRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Error: User not found with email: " + request.getEmail()));

        if (user.isVerified()) {
            return true;
        }

        if (user.getOtpCode() == null || !user.getOtpCode().equals(request.getCode())) {
            throw new IllegalArgumentException("Error: Invalid verification OTP code!");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Error: Verification code has expired!");
        }

        // Verification successful
        user.setVerified(true);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return true;
    }

    @Transactional
    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Error: User not found with email: " + email));

        if (user.isVerified()) {
            throw new IllegalArgumentException("Error: User is already verified!");
        }

        String otpCode = generateOtpCode();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(otpExpiryMinutes);

        user.setOtpCode(otpCode);
        user.setOtpExpiry(expiry);
        userRepository.save(user);

        mailService.sendOtpEmail(user.getEmail(), otpCode);
    }

    private String generateOtpCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 100000 to 999999
        return String.valueOf(code);
    }
}
