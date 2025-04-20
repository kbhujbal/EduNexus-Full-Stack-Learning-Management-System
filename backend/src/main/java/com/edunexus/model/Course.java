package com.edunexus.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String adminId;
    private Set<String> enrolledStudents = new HashSet<>();
    private Set<String> teachingAssistants = new HashSet<>();
    
    private List<CourseModule> modules = new ArrayList<>();
    private List<Announcement> announcements = new ArrayList<>();
    private List<Discussion> discussions = new ArrayList<>();
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    public static class CourseModule {
        private String id;
        private String title;
        private String description;
        private List<ModuleContent> contents = new ArrayList<>();
        private LocalDateTime dueDate;
    }
    
    @Data
    public static class ModuleContent {
        private String id;
        private String title;
        private ContentType type;
        private String content; // URL or text content
        private boolean required;
        
        public enum ContentType {
            VIDEO,
            DOCUMENT,
            ASSIGNMENT,
            QUIZ,
            REFERENCE_BOOK
        }
    }
    
    @Data
    public static class Announcement {
        private String id;
        private String title;
        private String content;
        private String authorId;
        private LocalDateTime createdAt;
    }
    
    @Data
    public static class Discussion {
        private String id;
        private String title;
        private String content;
        private String authorId;
        private boolean isAnonymous;
        private List<DiscussionReply> replies = new ArrayList<>();
        private LocalDateTime createdAt;
    }
    
    @Data
    public static class DiscussionReply {
        private String id;
        private String content;
        private String authorId;
        private boolean isAnonymous;
        private LocalDateTime createdAt;
    }
} 