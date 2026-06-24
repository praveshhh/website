package com.billspay.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final Logger logger = LoggerFactory.getLogger(MailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOtpEmail(String toEmail, String otpCode) {
        String subject = "BillsPay24X7 - Confirm Your Signup";
        String content = "Welcome to BillsPay24X7!\n\n"
                + "Please use the following 6-digit One-Time Password (OTP) to verify your account:\n"
                + "===> " + otpCode + " <===\n\n"
                + "This OTP is valid for 10 minutes. If you did not request this, please ignore this email.\n\n"
                + "Securely,\n"
                + "BillsPay24X7 Security Team";

        logger.info("------------- OTP EMAIL SYSTEM -------------");
        logger.info("To: {}", toEmail);
        logger.info("OTP Code: {}", otpCode);
        logger.info("---------------------------------------------");

        try {
            if (mailSender != null && !fromEmail.equals("dummy@gmail.com")) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(content);
                mailSender.send(message);
                logger.info("Successfully sent OTP email to {}", toEmail);
            } else {
                logger.warn("Mail sender is not fully configured (dummy credentials detected). OTP printed to console above.");
            }
        } catch (Exception e) {
            logger.error("Failed to send OTP email via SMTP (Error: {}). OTP is printed to console for local testing.", e.getMessage());
        }
    }
}
