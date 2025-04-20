export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  enrolledCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  enrolledStudents: string[];
  adminId: string;
  teachingAssistants: string[];
  modules: CourseModule[];
  announcements: Announcement[];
  discussions: Discussion[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  contents: ModuleContent[];
}

export interface ModuleContent {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'assignment';
  url?: string;
  content?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
} 