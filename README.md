# EduNexus - Full-Stack Learning Management System

EduNexus is a modern, full-stack Learning Management System (LMS) built with React, Spring Boot, and MongoDB. It provides a comprehensive platform for educational institutions to manage courses, students, and instructors.

## Features

### Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Admin, Instructor, Student)
- Secure password encryption using BCrypt
- User registration and login functionality
- Session management with JWT tokens

### User Management
- User registration with role selection
- User profile management
- Role-based access control
- User authentication and authorization
- Password encryption and security

### Course Management
- Course creation and management
- Course enrollment system
- Course content organization
- Course progress tracking
- Course categorization

### Student Features
- Course enrollment
- Progress tracking
- Course materials access
- Assignment submission
- Grade viewing

### Instructor Features
- Course creation and management
- Student enrollment management
- Assignment creation and grading
- Course content management
- Student progress monitoring

### Admin Features
- User management
- Course management
- System configuration
- Analytics and reporting
- Role management

## Tech Stack

### Frontend
- React.js
- Material-UI
- Axios for API calls
- React Router for navigation
- Redux for state management

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- MongoDB
- Maven

### Database
- MongoDB
- Document-based storage
- Flexible schema design

## Prerequisites

- Node.js (v14 or higher)
- Java JDK (v11 or higher)
- MongoDB
- Maven
- npm or yarn

## Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   mvn install
   ```

3. Configure MongoDB connection in `application.properties`

4. Start the backend server:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user details

### User Management
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Course Management
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/{id}` - Get course by ID
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

## Security Features
- JWT-based authentication
- Role-based access control
- Password encryption
- CORS configuration
- CSRF protection
- Input validation
- Secure session management

## Environment Variables

### Backend
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/edunexus
jwt.secret=your-secret-key
jwt.expiration=86400000
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:8083/api
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any queries or support, please contact the development team.
