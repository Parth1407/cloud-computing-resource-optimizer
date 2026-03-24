# 🚀 How to Run the Cloud Resource Optimizer

## Quick Start Guide

### Step 1: Start the Backend Server

Open a **PowerShell** or **Command Prompt** terminal:

```bash
cd "cloud-resource-optimizer\backend"

# Activate virtual environment
venv\Scripts\activate

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Start the server
python -m uvicorn main:app --reload --port 8000
```

**Backend will be available at:** `http://localhost:8000`
**API Documentation:** `http://localhost:8000/docs`

### Step 2: Start the Frontend (New Terminal)

Open a **NEW** PowerShell or Command Prompt terminal:

```bash
cd "cloud-resource-optimizer\frontend"

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

**Frontend will automatically open at:** `http://localhost:3000`

---

## Alternative: Using Startup Scripts

### Windows:
- **Backend:** Double-click `start-backend.bat`
- **Frontend:** Double-click `start-frontend.bat`

### Linux/Mac:
```bash
# Backend
./start-backend.sh

# Frontend (in new terminal)
./start-frontend.sh
```

---

## Troubleshooting

### Backend Issues:

1. **TensorFlow version error:**
   - Fixed! The requirements.txt now allows TensorFlow 2.20.0
   - Run: `pip install -r requirements.txt` again

2. **Port 8000 already in use:**
   - Change port: `python -m uvicorn main:app --reload --port 8001`
   - Update frontend API URL in `Dashboard.js` if needed

3. **Virtual environment not found:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Frontend Issues:

1. **react-scripts not found:**
   ```bash
   npm install --save-dev react-scripts@5.0.1 --legacy-peer-deps
   ```

2. **Node version issues (Node 22):**
   ```bash
   # Set OpenSSL legacy provider (PowerShell)
   $env:NODE_OPTIONS="--openssl-legacy-provider"
   npm start
   ```

3. **Port 3000 already in use:**
   - The app will automatically try port 3001, 3002, etc.

---

## What You'll See

Once both servers are running:

1. **Dashboard** - Real-time metrics and predictions
2. **Metric Cards** - CPU, Memory utilization with trends
3. **Cost Analysis** - Cost breakdown and savings potential
4. **Action Recommendations** - AI-powered scaling suggestions
5. **Interactive Charts** - Multi-metric visualizations
6. **Real-Time Stream** - Live metrics updating every 2 seconds
7. **Dark Theme Toggle** - Switch between light/dark modes

---

## Stopping the Servers

- **Backend:** Press `Ctrl+C` in the backend terminal
- **Frontend:** Press `Ctrl+C` in the frontend terminal

---

## Need Help?

- Check the browser console (F12) for frontend errors
- Check the backend terminal for API errors
- Verify both servers are running before accessing the frontend
