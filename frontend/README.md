# BillsPay24X7 Frontend (Vite + React)

A premium, CRED-inspired merchant dashboard and landing page. Features a dark mode aesthetic, glassmorphism UI components, fluid micro-animations (via `framer-motion`), and client-side End-to-End Encryption (E2EE) using the browser's Web Crypto API.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Project Structure
- `src/components/`
  - `Navbar.jsx`: Premium floating header.
  - `Hero.jsx`: Landing page and sections (Services, Features, Contact Form).
  - `AuthModal.jsx`: Login/Signup SMTP OTP verification portal.
  - `Dashboard.jsx`: Private portal for E2EE Vault, payouts simulator, and profile settings.
- `src/utils/`
  - `cryptoHelper.js`: Browser PBKDF2 key derivation and AES-GCM-256 encryption.
- `src/index.css`: CRED style variables, typography, and glassmorphic designs.
- `src/App.jsx`: State management, session caching, and component routing.

## Configuration
To point the frontend to your backend in production, create a `.env` file in the `frontend` root folder:
```env
VITE_API_URL=https://your-domain.com
```
In local development, if no env is set, it defaults to `http://localhost:8082`.

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will start locally on `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
This outputs static assets into the `dist/` directory, which can be served statically by Nginx.
