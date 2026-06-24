# BillsPay24X7 Secure Backend (Spring Boot)

This is the secure backend server for BillsPay24X7, built with Java 25 and Spring Boot 3.x. It features stateless JWT authentication, SMTP OTP verification via Gmail, and E2EE Vault storage mapped to an SQL database.

## Prerequisites
- Java 17 or higher (Java 25 recommended)
- Maven (or use the included Maven wrapper `mvnw.cmd` / `mvnw`)

## Project Structure
- `src/main/java/com/billspay/backend`
  - `config/`: Spring configurations.
  - `controller/`: REST controllers (`AuthController`, `VaultController`, `ContactController`).
  - `dto/`: Request/Response Data Transfer Objects.
  - `model/`: Hibernate JPA Database Entities (`User`, `VaultItem`, `ContactMessage`).
  - `repository/`: JpaRepository interfaces.
  - `security/`: JWT token filters, authentication manager, and Spring Security configurations.
  - `service/`: Core logic (`UserService`, `VaultService`, `MailService`).

## Configuration
All properties are configured in [application.yml](src/main/resources/application.yml). You can override them using environment variables:

| Environment Variable | Description | Default Value |
| -------------------- | ----------- | ------------- |
| `PORT` | Server listening port | `8082` |
| `SPRING_DATASOURCE_URL` | SQL Database connection URL | `jdbc:h2:./data/billspaydb` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `sa` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `password` |
| `GMAIL_USERNAME` | Your Gmail address (for OTPs) | `dummy@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail App Password | `dummypassword` |
| `JWT_SECRET` | 256-bit base64 security key | *Default auto-set* |

### Gmail SMTP Setup
To send OTP verification emails:
1. Go to your Google Account settings -> Security.
2. Enable **2-Step Verification**.
3. Search for **App Passwords** and create a new App Password for "Mail".
4. Copy the generated 16-character code and set it as `GMAIL_APP_PASSWORD`.
5. Set `GMAIL_USERNAME` to your email address.

*Note: If Gmail SMTP is not configured, the console logger prints all outgoing OTP codes for local testing.*

## How to Run

### 1. Build the project
```bash
# Windows
.\mvnw.cmd clean package

# Linux/macOS
./mvnw clean package
```

### 2. Run the application
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/macOS
./mvnw spring-boot:run
```

The server will start on port `8082`. The API will be available at `http://localhost:8082/api`.
The H2 Database Console will be available for inspection at `http://localhost:8082/h2-console` with default username `sa` and password `password`.
