React Resume Builder

A modern, full-stack web application that empowers users to create, customise and export professional resumes in real-time — built with the MERN stack and styled for flexibility & responsiveness.

🚀 Features
Multiple professionally-designed templates (Template1–Template5) with distinct layouts (blue-accent left-aligned header, teal timeline, green-accent summary, etc.)
Live preview: as users fill out input fields (personal info, education, experience, certifications, languages, skills, awards) the resume renders instantly.
Dynamic form fields: add multiple education/experience entries, certifications and language sections seamlessly.
PDF export functionality: convert the completed resume into a PDF for download or sharing.
Responsive design: supports multi-page resumes when many entries are present, and adjusts layout for different screen sizes.
Built with React for frontend, Node.js/Express + MongoDB (MERN) for backend (if applicable) — enabling persistence, template management and future enhancements.
Clean fallback-based data structure: templates render gracefully even when fields are missing or optional.


🛠 Tech Stack
Frontend: React (with live preview, dynamic forms, fallback rendering)
Styling: CSS (responsive classes such as .small-scale / .full-scale to handle multi-page/responsive logic)
Backend: Node.js + Express + MongoDB (for storing user data/templates) — if included in this repo
DevOps/Infrastructure: Docker, docker-compose.yml, Jenkinsfile, Kubernetes folder (K8s/) present — enabling containerised development and deployment.
CI/CD: Workflow defined (in .github/workflows/), Dockerfile for container builds.

🔧 Getting Started
Clone the repository:
git clone https://github.com/soumyadeep9800/React-Resume-Builder.git  
cd React-Resume-Builder  
Install dependencies (frontend + backend):
cd clients && npm install  
cd server && npm install  
use Docker:
docker build -t resume-builder .  
docker-compose up  
