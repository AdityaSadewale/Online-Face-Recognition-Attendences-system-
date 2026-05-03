# 📸Online-Face-Recognition-Attendences-system


A professional-grade automated attendance solution that leverages **Computer Vision** and **Deep Learning** to track student presence. This system bridges a **Django** backend with a **React** frontend, utilizing the **Google Sheets API** for structured, real-time reporting.

---

## 🚀 Key Features

*   **Real-Time Face Recognition:** Utilizes OpenCV and Dlib-based `face_recognition` to identify students via live webcam feeds.
*   **Hourly Slot Logic:** Intelligent backend tracking that marks attendance for specific time slots (e.g., 9:00 AM - 10:00 AM) to prevent duplicate entries.
*   **Google Sheets Integration:** Automatically populates a professionally structured spreadsheet with daily attendance data, including conditional formatting for "Present" and "Absent" status.
*   **Dynamic Dashboard:** A React-based interface for students to monitor their hourly attendance percentages and for administrators to manage student records.
*   **Scalable Architecture:** Built with a MERN-inspired approach, replacing Express with Django for robust Python-based AI integration.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons |
| **Backend** | Django (Python), Django Rest Framework (DRF) |
| **AI/ML** | OpenCV, Face-Recognition (dlib), NumPy |
| **Database** | PostgreSQL / SQLite |
| **External API** | Google Sheets API (via `gspread`) |

---

## 📂 Project Structure

```text
├── backend/
│   ├── attendance_logic/    # Face encoding & recognition scripts
│   ├── api/                 # Django REST API endpoints
│   └── sheets_handler.py    # Google Sheets API integration
├── frontend/
│   ├── src/components/      # Camera interface & Dashboard UI
│   └── src/hooks/           # Custom React hooks for API calls
├── students_db/             # Directory for student profile images
└── manage.py

⚙️ Setup & Installation
Clone the Repository:

Bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend Setup:

Bash
cd frontend
npm install
npm start
Google Sheets Configuration:

Place your service_account.json in the root directory.

Update the SPREADSHEET_ID in your backend configuration.

👨‍💻 Developed By
Aditya Sadewale.
