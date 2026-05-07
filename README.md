# 🚀 Uplift CRM: Executive Intelligence Command Center

**Uplift CRM** is a high-fidelity, production-grade Lead Management System designed with a "Cyber-Luxury" aesthetic. It transforms traditional CRM workflows into a streamlined, intelligence-driven experience, empowering Relationship Managers to capture deep insights and Executive Admins to orchestrate high-level pipeline operations with absolute precision.

---

## 🛠️ Technology Stack

### **Frontend (The Command UI)**
*   **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Ultra-fast HMR)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Design Tokens)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Fluid transitions & glassmorphism effects)
*   **Icons**: [Lucide React](https://lucide.dev/) (High-precision stroke icons)
*   **Visualizations**: [Chart.js](https://www.chartjs.org/) (Executive Dashboard metrics)

### **Backend (The Intelligence Engine)**
*   **Framework**: [Django 5.0](https://www.djangoproject.com/)
*   **API Layer**: [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
*   **Security**: [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) (Stateless JWT Authentication)
*   **Database**: [PostgreSQL](https://www.postgresql.org/) (Production) / [SQLite](https://www.sqlite.org/) (Local Dev)
*   **Environment**: [Python 3.10+](https://www.python.org/)

---

## ✨ Features Implemented

### 🛡️ **Executive Role-Based Access Control (RBAC)**
*   **Relationship Managers**: Full access to the "Opportunity Stream" and "Detailed Intelligence" narratives. Can edit profiles and capture notes.
*   **Executive Admins**: Exclusive access to the "Management Console" and "Termination" (Delete) capabilities.

### 📊 **Executive Dashboard**
*   High-level visualization of Total Revenue, Pipeline Velocity, and Status Distribution.
*   Intelligence-driven summaries of the most recent high-value leads.

### 🌊 **Opportunity Stream (Lead List)**
*   Glass-premium interface for tracking leads.
*   Real-time status badges and revenue projections.
*   Inline "Intelligence Briefing" quick-access notes.

### 🧠 **Detailed Intelligence (Timeline Narrative)**
*   A chronological audit trail of all client interactions.
*   **Macro-Scale Inline Editing**: Relationship Managers can refine intelligence entries directly within the timeline.
*   Permanently docked refinement tools for rapid data entry.

### 🏛️ **Management Console**
*   A centralized administrative suite for financial auditing and lead cleanup.
*   Localized currency support for Sri Lankan Rupees (**Rs.**).

---

## 🚀 How to Run Locally

### **1. Prerequisites**
*   Python 3.10+
*   Node.js 18+
*   Git

### **2. Backend Setup**
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### **3. Frontend Setup**
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

### **Backend (`backend/.env`)**
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=uplift_crm
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
```

### **Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 👤 Test Login Credentials

| Role | Username | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Executive Admin** | `admin` | `admin123` | Full System Control |
| **Sales Manager** | `testuser` | `password123` | Operational Access (No Delete) |

---

---

## 🎥 Demo Video
> [!IMPORTANT]
> [Click here to watch the Uplift CRM Demo Video](PASTE_YOUR_LINK_HERE)
> *The video demonstrates the complete lifecycle: Authentication -> Dashboard Navigation -> Opportunity Stream Management -> Detailed Intelligence Narratives.*

---

## 📂 Database Setup
The system uses Django's ORM to manage the following models:
1.  **Lead**: Core entity containing contact info, status, and `deal_value`.
2.  **Note**: Intelligence entries linked to leads, tracking `created_by` and `content`.
3.  **User**: Standard Django auth user extended via JWT payload for role identification.

### **Setup Instructions:**
1. Run `python manage.py makemigrations leads`
2. Run `python manage.py migrate`

---

## 🧠 Reflection & Technical Journey
Developing **Uplift CRM** was an exercise in balancing **Cyber-Luxury aesthetics** with **High-Availability operational logic**. 

*   **Design Philosophy**: We moved away from standard "flat" CRM designs to a "Glass-Premium" look using Tailwind CSS. This ensures that Relationship Managers feel they are using a modern, high-tech tool, which increases engagement.
*   **Security Architecture**: A key challenge was implementing granular Role-Based Access Control (RBAC). We ensured that while data is accessible for collaboration, destructive actions (termination) are strictly gated behind Administrative roles.
*   **Performance Optimization**: To handle the "Detailed Intelligence" timeline efficiently, we implemented a custom state management system in React that allows for high-fidelity inline editing without full page reloads, significantly reducing latency for the end-user.

---

*Designed & Engineered for Uplift Operations.*
