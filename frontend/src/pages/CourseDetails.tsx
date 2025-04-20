import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { fetchCourseById } from '../store/slices/courseSlice';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentCourse) {
    return (
      <Box p={3}>
        <Typography>Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {currentCourse.title}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" paragraph>
            {currentCourse.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Instructor: {currentCourse.instructor}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Duration: {currentCourse.duration}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Level: {currentCourse.level}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
            ${currentCourse.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetails; 