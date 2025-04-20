package com.edunexus.repository;

import com.edunexus.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByAdminId(String adminId);
    List<Course> findByEnrolledStudentsContaining(String studentId);
    List<Course> findByTeachingAssistantsContaining(String taId);
} 