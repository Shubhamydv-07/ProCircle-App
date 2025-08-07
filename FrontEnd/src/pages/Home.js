import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  Comment,
  Delete,
  Edit,
  Send,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    setSubmitting(true);
    try {
      const response = await api.post("/posts", { content: newPost });
      setPosts([response.data.post, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error('Failed to create post:', error);
      setError("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/like`);
      setPosts(
        posts.map((post) => (post._id === postId ? response.data.post : post))
      );
    } catch (error) {
      console.error('Failed to like post:', error);
      setError("Failed to like post");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
      setError("Failed to delete post");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Create Post Section */}
        {user && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Avatar src={user.profilePicture} alt={user.name}>
                {user.name?.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="What do you want to talk about?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={handleCreatePost}
                    disabled={!newPost.trim() || submitting}
                    startIcon={
                      submitting ? <CircularProgress size={20} /> : <Send />
                    }
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No posts yet. Be the first to share something!
            </Typography>
          </Paper>
        ) : (
          posts.map((post) => (
            <Card key={post._id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={post.author?.profilePicture}
                    alt={post.author?.name}
                    sx={{ mr: 2 }}
                  >
                    {post.author?.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {post.author?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(post.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  {post.likeCount > 0 && (
                    <Chip
                      label={`${post.likeCount} like${
                        post.likeCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {post.commentCount > 0 && (
                    <Chip
                      label={`${post.commentCount} comment${
                        post.commentCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                  <IconButton
                    onClick={() => handleLike(post._id)}
                    color={
                      post.likes?.some((like) => like._id === user?.id)
                        ? "primary"
                        : "default"
                    }
                  >
                    {post.likes?.some((like) => like._id === user?.id) ? (
                      <ThumbUp />
                    ) : (
                      <ThumbUpOutlined />
                    )}
                  </IconButton>
                  <IconButton>
                    <Comment />
                  </IconButton>
                </Box>
                {user && post.author?._id === user.id && (
                  <Box>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(post._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                )}
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};

export default Home;
