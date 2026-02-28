# 📄 Resume Analyser

Resume Analyser is a full-stack MERN web application that allows users to upload resumes and compare them with a job description.  
The system analyzes resume content and calculates similarity scores to determine how well a candidate matches a specific role.

---

## 🚀 Features

- 📤 Upload Resume (PDF / DOCX)
- 📝 Enter Job Description
- 📊 Resume & Job Description Matching
- 📈 Similarity Score Calculation
- 🔐 User Authentication 
- ☁️ Cloud-based storage
- 📱 Responsive UI

---

## 🛠 Tech Stack

### 🌐 Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### ⚙ Backend
- Node.js
- Express.js

### 🗄 Database
- MongoDB (Mongoose)

### 🔧 Tools & Libraries
- Multer (File Upload)
- Git & GitHub
- Postman

---

## 📂 Project Structure

Resume-Analyser/
│
├── mern_ai/        # React Frontend
├── backend_ai/        # Node + Express Backend
├── .gitignore
└── README.md

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Akankshapokharkar21/Resume-Analyser.git  
cd Resume-Analyser  

---

### 2️⃣ Backend Setup

cd server  
npm install  
npm start  

Server runs on:  
http://localhost:5000  

---

### 3️⃣ Frontend Setup

cd client  
npm install  
npm start  

Frontend runs on:  
http://localhost:3000  

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder and add:

MONGO_URI=your_mongodb_connection_string  
 
PORT=8080

⚠ Do not upload your `.env` file to GitHub.

---

## 🧠 How It Works

1. User uploads a resume.
2. User enters a job description.
3. Backend processes and extracts resume content.
4. The system compares resume data with job description.
5. Similarity score is calculated and displayed.

---

## 📌 Future Enhancements

- Keyword highlighting
- AI-based semantic analysis
- Admin dashboard
- Deployment on Render / Vercel / AWS
- Downloadable analysis report (PDF)

---

## 👩‍💻 Author

Akanksha Pokharkar
GitHub: https://github.com/Akankshapokharkar21  

---

⭐ If you like this project, consider giving it a star!
