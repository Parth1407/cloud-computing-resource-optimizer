# Cloud Resource Optimizer — Project Context

> AI-Driven Cloud Computing Resource Optimization Platform  
> Built with FastAPI (Python) + React.js + LSTM Neural Network

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Application Flow](#application-flow)
- [Frontend Components](#frontend-components)
- [Backend Services](#backend-services)
- [LSTM Model — Training & Decision Pipeline](#lstm-model--training--decision-pipeline)
- [Dataset — Alibaba Cluster Trace 2018](#dataset--alibaba-cluster-trace-2018)
- [API Endpoints](#api-endpoints)
- [Key Design Decisions](#key-design-decisions)
- [All Changes Log](#all-changes-log)
- [Running the Project](#running-the-project)
- [Known Limitations & Future Work](#known-limitations--future-work)

---

## Overview

Cloud Resource Optimizer is a full-stack platform that uses an LSTM (Long Short-Term Memory) neural network to predict cloud infrastructure metrics (CPU, Memory, Network, Disk I/O) and recommend intelligent scaling actions to cloud architects. The system provides real-time telemetry streaming, cost savings calculations, and a Human-in-the-Loop (HITL) control panel where architects can override AI decisions.

### Core Value Proposition
- **Predict** resource utilization before spikes happen
- **Recommend** scale up/down actions with confidence scores
- **Save costs** by preventing over-provisioning
- **Empower architects** with manual override controls

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│                                                               │
│  Login → Cloud Setup → LLM Setup → Dashboard                │
│          ↓                ↓            ↓                     │
│    AWS/GCP/Azure    OpenAI/Anthropic  Live Telemetry         │
│    API Keys         /Gemini Keys      + HITL Controls        │
│                                                               │
│  Security Page  |  Settings Page  |  Navbar (Global)         │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTP + WebSocket
┌──────────────────────▼───────────────────────────────────────┐
│                    BACKEND (FastAPI)                           │
│                                                               │
│  /api/dashboard/stats  →  Current Metrics + Predictions      │
│  /api/predict/         →  LSTM Forecast + Action Engine      │
│  /ws                   →  Real-time WebSocket Stream         │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────┐         │
│  │   LSTM   │  │ Action Engine│  │ Cost Calculator │         │
│  │  Model   │→ │  (Scaling)   │→ │  (Savings)      │         │
│  └──────────┘  └──────────────┘  └────────────────┘         │
│       ↑                                                       │
│  Alibaba Cluster Trace 2018 (machine_usage.csv)              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Recharts | Telemetry chart visualization |
| Lucide React | Icon library |
| Axios | HTTP client for API calls |
| WebSocket (native) | Real-time data streaming |
| Vanilla CSS | Custom styling with CSS variables |

### Backend
| Technology | Purpose |
|-----------|---------|
| FastAPI | REST API framework |
| TensorFlow/Keras | LSTM neural network |
| SQLAlchemy | ORM + SQLite database |
| Pandas | Dataset loading & preprocessing |
| NumPy | Numerical computations |
| Uvicorn | ASGI server |
| Pydantic | Request/response validation |

---

## Application Flow

### Onboarding Sequence

```
1. LOGIN (/login)
   ├── Demo credentials: admin@enterprise.com / admin123
   ├── Animated dark theme with glassmorphism
   └── Routes to → /cloud-setup

2. CLOUD INTEGRATION (/cloud-setup)
   ├── Provider selector: AWS / GCP / Azure
   ├── Input: Access Key, Secret Key, Data Region
   ├── Test Sandbox: Pre-fills demo credentials
   └── Routes to → /llm-setup

3. LLM INTEGRATION (/llm-setup)
   ├── Provider selector: OpenAI / Anthropic / Gemini
   ├── Input: API Key, Data Region
   ├── Test Sandbox: Pre-fills demo keys
   └── Routes to → /dashboard

4. OPERATIONS DASHBOARD (/dashboard)
   ├── Live telemetry metrics (CPU, Memory)
   ├── Cost Savings card
   ├── AI Recommendation with confidence
   ├── Real-time chart + terminal stream
   ├── Node Health grid
   └── HITL Control Override panel
```

### Navigation (Global Navbar)
- **Dashboard** — Main operations view
- **Integrations** — Cloud Setup / LLM Setup
- **Security** — IAM posture & token encryption status
- **Settings** — Email alerts, logging, data retention
- **Logout** — Returns to login

---

## Frontend Components

### Pages

| Component | File | Description |
|-----------|------|-------------|
| `Login` | `Login.js` | Authentication portal with animated dark theme |
| `CloudSetup` | `CloudSetup.js` | AWS/GCP/Azure credential configuration |
| `LlmSetup` | `LlmSetup.js` | OpenAI/Anthropic/Gemini API key setup |
| `Dashboard` | `Dashboard.js` | Main operations dashboard with all widgets |
| `Security` | `Security.js` | IAM sync, token encryption, SSO status |
| `Settings` | `Settings.js` | Email alerts, verbose logging, data retention |

### Dashboard Widgets

| Component | File | Description |
|-----------|------|-------------|
| `MetricCard` | `MetricCard.js` | Displays current vs predicted CPU/Memory with trend arrows |
| `CostCard` | `CostCard.js` | Hourly Cost, Monthly/Annual projections, potential savings |
| `ActionCard` | `ActionCard.js` | AI recommendation with urgency level and confidence meter |
| `Chart` | `Chart.js` | Recharts line chart for CPU, Memory, Network over time |
| `Navbar` | `Navbar.js` | Global navigation bar with active link highlighting |

### Styling
| File | Scope |
|------|-------|
| `Auth.css` | Login, CloudSetup, LlmSetup pages |
| `Dashboard.css` | Dashboard, Security, Settings pages |
| `Navbar.css` | Global navigation bar |

### Theme System
- **Dark theme** is the default (enforced via `localStorage`)
- Theme toggle available on Login page and Dashboard header
- CSS variables (`--text-main`, `--accent`, `--bg-card`, etc.) drive the theme

---

## Backend Services

### Action Engine (`services/action_engine.py`)
Determines scaling recommendations based on predicted utilization:

```python
avg_utilization = (predicted_cpu + predicted_memory) / 2

if avg > scale_up_threshold   → "Scale Up"    (Provision / Upscale)
if avg < scale_down_threshold → "Scale Down"  (Deprovision / Downscale)  
else                          → "Maintain"     (Optimal)
```

**Adaptive thresholds**: Confidence score shifts the thresholds. Low confidence = model needs more extreme readings to trigger an action.

### Cost Calculator (`services/cost_calculator.py`)
- `calculate_current_cost()` — Base + utilization-based cost per instance
- `calculate_scaling_cost_impact()` — Compares current vs optimal instance count
- `calculate_monthly_cost()` / `calculate_annual_cost()` — Projections

### Data Simulator (`utils/simulate_data.py`)
Generates realistic real-time metrics for the WebSocket stream:
- Sinusoidal trends + seasonal patterns + random spikes (10% chance)
- Feeds the live terminal and chart in real-time

---

## LSTM Model — Training & Decision Pipeline

### Model Architecture

```
Input: (sequence_length, 4)  →  4 features: CPU, Memory, Network, Disk I/O

Layer 1:  LSTM(64 units, relu, return_sequences=True)
Layer 2:  Dropout(0.2)
Layer 3:  LSTM(32 units, relu, return_sequences=False)
Layer 4:  Dropout(0.2)
Layer 5:  Dense(16, relu)
Layer 6:  Dense(1)  →  Predicted next CPU utilization %

Optimizer: Adam
Loss: MSE (Mean Squared Error)
Metrics: MAE (Mean Absolute Error)
```

### Training Configuration
| Parameter | Value |
|-----------|-------|
| Sequence Length | 10 time steps |
| Epochs | Up to 50 (early stopping) |
| Batch Size | 32 |
| Early Stopping Patience | 10 epochs |
| Train/Validation Split | 80% / 20% |
| Max Machines Sampled | 200 (from 4,000 available) |
| Max Rows Loaded | 500,000 |

### How Training Works

```
1. LOAD:    Read machine_usage.csv from backend/data/
2. SAMPLE:  Pick 200 random machines from the dataset
3. CLEAN:   Drop NaN/invalid values, clamp to valid ranges
4. WINDOW:  Create sliding windows of 10 timesteps per machine
5. TRAIN:   Feed sequences → LSTM learns to predict next CPU%
6. SAVE:    Export trained weights to models/lstm_model.h5
```

### How Predictions Work (Runtime)

```
1. Dashboard calls GET /api/dashboard/stats
2. Backend retrieves last 10 metric records from SQLite
3. If not enough records → falls back to simulated data
4. LSTM ingests the sequence → outputs predicted CPU & Memory
5. Action Engine takes predictions → recommends Scale Up/Down/Maintain
6. Cost Calculator computes savings → returns to frontend
7. Dashboard renders MetricCard, CostCard, ActionCard
```

### Confidence Scoring
```python
confidence = 1.0 - (variance / 1000)  # clamped to [0.3, 0.95]
```
Low data variance → high confidence → model is sure about the pattern.
High variance → low confidence → adaptive thresholds become more conservative.

### Fallback System
If TensorFlow is not installed or the dataset is missing:
- Falls back to a simple moving average with trend extrapolation
- Confidence is capped at 0.6 in fallback mode
- The dashboard still functions normally

---

## Dataset — Alibaba Cluster Trace 2018

### Why This Dataset

| Criteria | Detail |
|----------|--------|
| **Source** | Alibaba Group — real production datacenter |
| **Scale** | 4,000 machines, 8 days continuous |
| **Metrics** | CPU, Memory, Network (in/out), Disk I/O |
| **Research** | Cited in USENIX NSDI, SoCC, ICPP, ATC papers |
| **Format** | CSV (headerless, columns pipe-separated) |

### Schema — `machine_usage.csv`

| Column | Name | Description | Used in Training |
|--------|------|-------------|:---:|
| 1 | `machine_id` | Unique server identifier | Grouping |
| 2 | `time_stamp` | Timestamp in seconds | Sorting |
| 3 | `cpu_util_percent` | CPU utilization (0-100) | ✅ |
| 4 | `mem_util_percent` | Memory utilization (0-100) | ✅ |
| 5 | `mem_gps` | Memory bandwidth GB/s | ❌ (often empty) |
| 6 | `mkpi` | Cache misses per 1K instructions | ❌ (often empty) |
| 7 | `net_in` | Incoming network traffic (normalized) | ✅ |
| 8 | `net_out` | Outgoing network traffic (normalized) | ❌ (use net_in) |
| 9 | `disk_io_percent` | Disk I/O utilization (0-100) | ✅ |

### How to Obtain
1. Visit [github.com/alibaba/clusterdata](https://github.com/alibaba/clusterdata)
2. Complete the short survey: [Survey Link](http://alibabadeveloper.mikecrm.com/BdJtacN)
3. Download `machine_usage.tar.gz` (~18 GB)
4. Extract and place `machine_usage.csv` in `backend/data/`

### Why Not Other Datasets?

| Dataset | Why Not |
|---------|---------|
| **Google Cluster Trace** | 2.4 TB, requires BigQuery, JSON format, no explicit network data |
| **Azure VM Traces** | Only CPU + Memory, no Network or Disk I/O |
| **Bitbrains** | Real data but only 2 MB — too small for industry credibility |
| **Kaggle synthetic sets** | Not real production data |

### Data Recency Note
The 2018 data is still valid because cloud infrastructure behavior (CPU spikes, memory cycles, idle periods) hasn't fundamentally changed. The LSTM learns temporal patterns, not absolute values. Once deployed with a customer, the model fine-tunes on their live data anyway.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API info and available endpoints |
| `GET` | `/health` | Health check with timestamp |
| `GET` | `/api/dashboard/stats` | Current metrics + predictions + cost data |
| `GET` | `/api/predict/` | Full prediction with action recommendation |
| `GET` | `/api/predict/action` | Detailed scaling action recommendation |
| `GET` | `/api/metrics/` | Historical metric records |
| `POST` | `/api/metrics/` | Record new metric data point |
| `WS` | `/ws` | Real-time WebSocket telemetry stream |

---

## Key Design Decisions

### 1. Dark Theme Default
Dark theme is enforced as the default across all pages. Cloud architects typically work in dark-themed environments (terminal-heavy workflows), and it reduces eye strain during long monitoring sessions.

### 2. Cost Savings (not Financial Impact / Burn Rate)
The label "Financial Impact" was renamed to "Cost Savings" and "Burn Rate (Hourly)" was renamed to "Hourly Cost" for clarity. Cloud architects think in infrastructure terms, not startup finance terms.

### 3. Human-in-the-Loop (HITL) Controls
The AI doesn't act autonomously. It recommends — the architect decides. The HITL panel provides:
- **AI Auto toggle** — Enable/disable AI-driven autoscaling
- **Hard Node Limit Constraint** — Mandatory billing fail-safe that caps maximum server allocations during traffic spikes, preventing the AI model from exceeding the defined scaling budget
- **Force Provision (Upscale)** — Manually spin up new instances
- **Force Deprovision (Downscale)** — Manually shut down idle instances
- **Submit Error Logs & Halt** — Emergency stop with error reporting

### 4. Neural Model Trajectory Phrasing
The "Maintain" action reason reads: *"Neural model trajectory (X%) aligns with historical ingress patterns. Zero structural scaling required."* 
This avoids static threshold-based language since the model is dynamic (LSTM), not a simple rule-based system.

### 5. Multivariate LSTM (4 features)
The model trains on CPU + Memory + Network + Disk I/O simultaneously, not just CPU alone. This allows the model to detect correlations (e.g., high disk I/O often precedes CPU spikes during batch processing).

### 6. Graceful Fallback
If TensorFlow isn't installed or the dataset is missing, everything still works. The system silently degrades to a moving average predictor with capped confidence.

---

## All Changes Log

### UI & Onboarding
- [x] Added theme toggle (dark/light) across Login and Dashboard
- [x] Enforced dark theme as default
- [x] Created global Navbar component with active link highlighting
- [x] Made all Navbar links functional (Dashboard, Integrations, Security, Settings)
- [x] Renamed "Overview" to "Dashboard" in Navbar
- [x] Built Cloud Integration page (AWS/GCP/Azure) as onboarding Step 1
- [x] Built LLM Integration page (OpenAI/Anthropic/Gemini) as onboarding Step 2
- [x] Unified theme between CloudSetup and LlmSetup (minimal-theme)
- [x] Created Security page (IAM Sync, Token Encryption, SSO status)
- [x] Created Settings page (Email Alerts, Verbose Logging, Data Retention)
- [x] Improved minimalist logo (Cloud + Infinity loop)
- [x] Removed redundant project title from Dashboard header
- [x] Added logout functionality

### Dashboard Widgets
- [x] Renamed "Financial Impact" → "Cost Savings"
- [x] Renamed "Burn Rate (Hourly)" → "Hourly Cost"
- [x] Added HITL Control Override panel
- [x] Added AI Auto ON/OFF toggle
- [x] Added Hard Node Limit Constraint slider with explanation
- [x] Added Force Provision (Upscale) button
- [x] Added Force Deprovision (Downscale) button
- [x] Added Submit Error Logs & Halt button
- [x] Removed "Simulate Chaos" feature
- [x] Added Active Node Health grid
- [x] Made Export JSON button functional (downloads audit report)
- [x] Rephrased "Maintain" action to use dynamic neural model language

### LSTM Model
- [x] Upgraded from univariate (CPU only) to multivariate (CPU + Memory + Network + Disk I/O)
- [x] Integrated Alibaba Cluster Trace 2018 as training data source
- [x] Created data loading pipeline with chunked CSV reading
- [x] Added machine sampling (200 from 4,000) for manageable training
- [x] Added data cleaning (NaN removal, value clamping)
- [x] Created standalone training script (`train_model.py`)
- [x] Maintained backward compatibility (fallback to synthetic data)
- [x] Added `backend/data/` directory with README for dataset placement

---

## Running the Project

### Prerequisites
- Python 3.10+ with TensorFlow, FastAPI, pandas, numpy
- Node.js 18+ with npm

### Backend
```bash
cd backend
pip install -r requirements.txt

# Train the model (place machine_usage.csv in backend/data/ first)
python train_model.py

# Start the API server
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Demo Login
```
Email:    admin@enterprise.com
Password: admin123
```

---

## Known Limitations & Future Work

### Current Limitations
| Area | Limitation |
|------|-----------|
| **Cloud Integration** | Onboarding captures API keys but doesn't connect to real AWS/GCP/Azure SDKs |
| **LLM Integration** | Captures API keys but doesn't call real OpenAI/Anthropic/Gemini endpoints |
| **Authentication** | Demo credentials only, no real JWT/OAuth |
| **HITL Actions** | Provision/Deprovision/Halt show alerts but don't execute real infrastructure changes |
| **Node Health** | Uses static mock data, not live cluster discovery |
| **Security Page** | Static mock, not connected to real IAM |
| **Settings Page** | Toggles are visual only, not persisted |

### Future Work
1. **Real Cloud SDK Integration** — Connect to AWS CloudWatch, GCP Stackdriver, Azure Monitor for live metrics
2. **Online Learning** — Periodically retrain the LSTM on newly collected customer data
3. **Multi-step Prediction** — Forecast 5-10 steps ahead for capacity planning
4. **Anomaly Detection** — Flag readings outside learned distributions
5. **JWT Authentication** — Replace demo credentials with real auth middleware
6. **Kubernetes Integration** — Auto-execute scaling via K8s HPA
7. **Alert Pipeline** — Email/Slack notifications via SendGrid/webhooks
8. **Multi-tenant Support** — Isolate data and models per customer
