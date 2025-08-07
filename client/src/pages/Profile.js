import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${user.id}`);
      setUserPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      bio: user?.bio || '',
      profilePicture: user?.profilePicture || ''
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await updateProfile(profileData);
    
    if (result.success) {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Profile Header */}
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
              {isEditing ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={profileData.profilePicture}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </Box>
              ) : (
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {user.bio || 'No bio yet'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Member since {formatDate(user.createdAt)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>

        {/* User Posts */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            My Posts
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {postsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : userPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                You haven't posted anything yet.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start sharing your thoughts with the community!
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

export default Profile; 