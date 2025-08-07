import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="info">
            User not found
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* User Profile Header */}
        <Paper sx={{ p: 4, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={user.profilePicture}
              alt={user.name}
              sx={{ width: 120, height: 120, mr: 3 }}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {user.bio || 'No bio available'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {formatDate(user.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* User Posts */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {user.name}'s Posts
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {postsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : userPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                {user.name} hasn't posted anything yet.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {userPosts.map((post) => (
                <Grid item xs={12} key={post._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {post.content}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(post.createdAt)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {post.likeCount > 0 && (
                          <Typography variant="body2" color="primary">
                            {post.likeCount} like{post.likeCount > 1 ? 's' : ''}
                          </Typography>
                        )}
                        {post.commentCount > 0 && (
                          <Typography variant="body2" color="secondary">
                            {post.commentCount} comment{post.commentCount > 1 ? 's' : ''}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile; 