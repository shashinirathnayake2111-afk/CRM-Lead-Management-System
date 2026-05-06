# Uplift CRM

A modern, full-stack CRM Lead Management System built with Django, React, and MongoDB.

## Features
- **Dashboard**: Visual summary of sales pipeline and lead statistics.
- **Lead Management**: Complete CRUD functionality for managing sales leads.
- **Lead Notes**: Track follow-up activities and internal notes for each lead.
- **Premium UI**: Glassmorphism aesthetic with dark mode and smooth animations.
- **Secure Auth**: JWT-based authentication system.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Django, Django Rest Framework, SimpleJWT.
- **Database**: MongoDB (via pymongo).

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js & npm
- MongoDB (running locally on `mongodb://localhost:27017`)

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
3. (Already done during setup) Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. (Already done during setup) Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Login
Use the following test credentials:
- **Email**: `admin@example.com`
- **Password**: `password123`

## Screenshots
(Coming soon)
