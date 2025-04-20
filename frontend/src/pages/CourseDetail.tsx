import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Tabs,
  Tab,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  VideoLibrary as VideoIcon,
  Forum as ForumIcon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { Course } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon />;
      case 'quiz':
        return <QuizIcon />;
      case 'video':
        return <VideoIcon />;
      default:
        return <DescriptionIcon />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Course not found</Typography>
      </Box>
    );
  }

  const isEnrolled = course.enrolledStudents.includes(user?.id || '');
  const isInstructor = course.adminId === user?.id || course.teachingAssistants.includes(user?.id || '');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Typography color="text.secondary" paragraph>
        {course.description}
      </Typography>

      {!isEnrolled && !isInstructor && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={async () => {
            try {
              await fetch(`http://localhost:8080/api/courses/${id}/enroll`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              // Refresh course data
              const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              const data = await response.json();
              setCourse(data);
            } catch (error) {
              console.error('Error enrolling in course:', error);
            }
          }}
        >
          Enroll in Course
        </Button>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Modules" />
          <Tab label="Announcements" />
          <Tab label="Discussions" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tabValue === 0 && (
            <List>
              {course.modules.map((module) => (
                <React.Fragment key={module.id}>
                  <ListItem>
                    <ListItemIcon>{getModuleIcon(module.contents[0]?.type || '')}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="div">
                          {module.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {module.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}

          {tabValue === 1 && (
            <List>
              {course.announcements.map((announcement) => (
                <React.Fragment key={announcement.id}>
                  <ListItem>
                    <ListItemIcon>
                      <AnnouncementIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={announcement.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {announcement.content}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {' - '}
                            {new Date(announcement.createdAt).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}

          {tabValue === 2 && (
            <List>
              {course.discussions.map((discussion) => (
                <React.Fragment key={discussion.id}>
                  <ListItem>
                    <ListItemIcon>
                      <ForumIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={discussion.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {discussion.content}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {' - '}
                            {new Date(discussion.createdAt).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CourseDetail; 