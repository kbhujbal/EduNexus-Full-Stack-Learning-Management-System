# EduNexus - Full-Stack Learning Management System

EduNexus is a modern learning management system built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive platform for managing courses, assignments, and student-instructor interactions.

## Features

- User Authentication (Student, Instructor, Admin roles)
- Course Management
- Module-based Learning Content
- Assignments and Quizzes
- Discussion Forums
- Announcements
- Profile Management
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edunexus.git
cd edunexus
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Backend (.env):
```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/edunexus
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## Project Structure

```
edunexus/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   ├── types/
    │   ├── App.tsx
    │   └── index.tsx
    ├── package.json
    └── tsconfig.json
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get course by ID
- POST /api/courses - Create a new course
- PUT /api/courses/:id - Update course
- DELETE /api/courses/:id - Delete course
- POST /api/courses/:id/enroll - Enroll in a course

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- PUT /api/users/password - Change password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
=======
