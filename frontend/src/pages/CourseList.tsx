import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { fetchCourses } from '../store/slices/courseSlice';

const CourseList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEnroll = async (courseId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Refresh courses after enrollment
        dispatch(fetchCourses());
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList; 