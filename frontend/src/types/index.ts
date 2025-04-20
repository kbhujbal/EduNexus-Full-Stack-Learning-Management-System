export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    enrolledCourses: string[];
    managedCourses: string[];
    createdAt: string;
    updatedAt: string;
}

export enum UserRole {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN'
}

export interface Course {
    _id: string;
    title: string;
    description: string;
    adminId: User;
    enrolledStudents: string[];
    teachingAssistants: string[];
    modules: CourseModule[];
    announcements: Announcement[];
    discussions: Discussion[];
    createdAt: string;
    updatedAt: string;
}

export interface CourseModule {
    _id: string;
    title: string;
    description: string;
    contents: ModuleContent[];
    dueDate?: string;
}

export interface ModuleContent {
    _id: string;
    title: string;
    type: 'text' | 'video' | 'assignment' | 'quiz';
    content: string;
    required: boolean;
}

export enum ContentType {
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT',
    ASSIGNMENT = 'ASSIGNMENT',
    QUIZ = 'QUIZ',
    REFERENCE_BOOK = 'REFERENCE_BOOK'
}

export interface Announcement {
    _id: string;
    title: string;
    content: string;
    authorId: User;
    createdAt: string;
}

export interface Discussion {
    _id: string;
    title: string;
    content: string;
    authorId: User;
    isAnonymous: boolean;
    replies: DiscussionReply[];
    createdAt: string;
}

export interface DiscussionReply {
    _id: string;
    content: string;
    authorId: User;
    isAnonymous: boolean;
    createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    firstName: string;
    lastName: string;
    role?: UserRole;
} 