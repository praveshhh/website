# Production Deployment Guide: Docker, Nginx, SSL, and Hostinger DNS

This guide details how to safely deploy the new E2EE merchant wallet platform on your existing AWS EC2 instance without affecting your currently running `partners.billspay24x7.in` website. We will containerize the application using **Docker Compose** and use **Nginx** as a reverse proxy to route traffic.

---

## Architecture Overview

```
                      [ Client Browser ]
                              │
                              ▼ (HTTPS: Port 443)
              [ Host Nginx Server on AWS EC2 ]
              (Routes based on the domain name)
               /                              \
              /                                \
   [ Existing Website ]                [ Docker Network (E2EE Wallet App) ]
   partners.billspay24x7.in            subdomain.billspay24x7.in
   (Unchanged)                         /                        \
                                      /                          \
                        [ Frontend Container ]         [ Backend Container ]
                        Port 8080 (React + Vite)      Port 8082 (Spring Boot)
                                                                 │
                                                                 ▼
                                                        [ Database Container ]
                                                        Port 5432 (PostgreSQL)
```

---

## Step 1: DNS Setup on Hostinger

To point your new domain or subdomain (e.g., `wallet.billspay24x7.in` or `newdomain.in`) to your AWS server:

1. Log in to your **Hostinger Control Panel**.
2. Go to **Domains** -> select your domain -> **DNS / Nameservers**.
3. Add a new **A Record**:
   - **Type**: `A`
   - **Name**: `wallet` (or `@` if using root domain)
   - **Points to**: `[YOUR_AWS_EC2_PUBLIC_IP]`
   - **TTL**: `3600` (or default)
4. Click **Add Record**. (Propagation usually completes in under 30 minutes).

---

## Step 2: Transfer Code from Local Desktop to EC2

The cleanest way to transfer your code is by using **Git**:
1. Initialize git locally, commit files, and push to a Git repository (e.g. GitHub or GitLab):
   ```bash
   git init
   git add .
   git commit -m "Initialize project with Docker setup"
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. Log in to your EC2 instance via SSH and clone the repository:
   ```bash
   git clone <your-repo-url> /opt/billspay-website
   cd /opt/billspay-website
   ```

*(Alternatively, you can compress the files locally and copy them using `scp`: `scp -r ./* ubuntu@[EC2_IP]:/opt/billspay-website`)*

---

## Step 3: Run the Application on EC2 using Docker Compose

1. **Install Docker and Docker Compose on EC2** (if not already installed):
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose-v2
   sudo usermod -aG docker ubuntu
   # Log out and log back in for group changes to take effect
   ```

2. **Create a `.env` file** in the root project folder `/opt/billspay-website/.env` to secure credentials:
   ```env
   GMAIL_USERNAME=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-gmail-app-password
   JWT_SECRET=d2Vic2l0ZS1jcmVkLXVpLWVuZC10by1lbmQtZW5jcnlwdGlvbi1zZWNyZXQta2V5LTI1Ni1iaXQtY29kZQ==
   ```

3. **Build and start the containers** in detached mode:
   ```bash
   sudo docker compose up --build -d
   ```

4. **Verify container status**:
   ```bash
   sudo docker compose ps
   ```
   You should see three running containers: `billspay-db` (port 5432 internal), `billspay-backend` (port 8082), and `billspay-frontend` (port 8080).

---

## Step 4: Configure Nginx on EC2 Host for Co-Hosting

Since you already have `partners.billspay24x7.in` running, Nginx is already installed and listening on ports 80/443. We will add a new server block specifically for the new subdomain to reverse proxy to our Docker containers.

1. **Create Nginx configuration** for the new site:
   ```bash
   sudo nano /etc/nginx/sites-available/billspay-wallet
   ```

2. **Paste the following configuration** (replace `wallet.billspay24x7.in` with your subdomain):
   ```nginx
   server {
       listen 80;
       server_name wallet.billspay24x7.in;

       # Route API requests to the Backend Container
       location /api {
           proxy_pass http://127.0.0.1:8082;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Route all other web requests to the Frontend Container
       location / {
           proxy_pass http://127.0.0.1:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Enable the configuration**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/billspay-wallet /etc/nginx/sites-enabled/
   ```

4. **Test Nginx syntax & restart**:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Step 5: Secure with SSL (HTTPS) via Certbot

Let's Encrypt will secure the new domain without affecting your existing certificates.

1. **Run Certbot**:
   ```bash
   sudo certbot --nginx
   ```
2. Certbot will list your active configurations (e.g., `partners.billspay24x7.in` and `wallet.billspay24x7.in`). 
3. Choose the number corresponding to your **new domain/subdomain** to obtain the certificate.
4. Select **Redirect** option when prompted to automatically redirect all HTTP traffic to HTTPS.
5. Certbot will reload Nginx automatically.

---

## Step 6: Verify Deployment

1. Visit `https://wallet.billspay24x7.in` in your browser.
2. Confirm the UI renders correctly (CRED design theme).
3. Test signup, retrieve the OTP code using Docker logs (see below), verify, login, and verify E2EE vault actions.

### Useful Commands for Maintenance on EC2

*   **View backend application logs (to check OTP codes)**:
    ```bash
    sudo docker logs -f billspay-backend
    ```
*   **Stop the application**:
    ```bash
    sudo docker compose down
    ```
*   **Restart the application**:
    ```bash
    sudo docker compose restart
    ```
