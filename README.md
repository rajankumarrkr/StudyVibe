# StudyVibe - Instagram-Style MCQ Education App

StudyVibe is a MERN stack application designed for government exam aspirants and students. It features a vertical scrolling feed of objective questions (MCQs), instant feedback, and AI-powered question generation from images.

## Core Features
1.  **Vertical MCQ Feed**: Scroll through questions like Instagram Reels.
2.  **Instant Feedback**: Get immediate correct/wrong results upon selection.
3.  **Image-to-MCQ (OCR)**: Upload photos of books or screenshots to add questions via AI.
4.  **Analytics**: Track daily progress, accuracy, and subject-wise performance.
5.  **Personalization**: Filter content by subjects (Math, History, etc.) and exams (SSC, UPSC, etc.).

## Tech Stack
-   **Frontend**: React.js, TailwindCSS, Framer Motion, Zustand
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB Atlas
-   **AI/OCR**: Tesseract.js / OpenAI Vision

## Setup Instructions

### Backend
1.  `cd server`
2.  `npm install`
3.  Create a `.env` file with `MONGODB_URI` and `JWT_SECRET`.
4.  `npm start`

### Frontend
1.  `cd client`
2.  `npm install`
3.  `npm run dev`

## License
MIT
