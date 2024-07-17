import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AllPosts from './pages/AllPosts';
import PostView from './pages/PostView';
import CreatePost from './pages/CreatePost';
import CreateAuthor from './pages/CreateAuthor';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);

    // Function to fetch posts
    const fetchPosts = async () => {
      try {
          const response = await fetch("https://blog-api-app.fly.dev/posts/", { mode: 'cors' });
          if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          return data.posts;
      } catch (error) {
          console.log(error);
      }
    };



    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleCreatePost = (newPost) => {
        setPosts([...posts, { ...newPost, id: posts.length + 1, comments: [] }]);
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    const handleDeleteComment = (postId, commentId) => {
        setPosts(
            posts.map((post) =>
                post.id === postId
                  ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
                  : post
            )
        );
    };

    useEffect(() => {
      const loadPosts = async () => {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      }
      loadPosts();  
      
    }, [])

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="outlet">
                <Routes>
                    <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
                    <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                    <Route
                      path="/all-posts"
                      element={
                        isLoggedIn ? (
                          <AllPosts posts={posts} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/posts/:postId"
                      element={
                        isLoggedIn ? (
                          <PostView
                            posts={posts}
                            handlePublish={() => {}}
                            handleUpdate={() => {}}
                            handleDelete={handleDeletePost}
                            handleDeleteComment={handleDeleteComment}
                          />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/create-post"
                      element={
                        isLoggedIn ? (
                          <CreatePost handleCreatePost={handleCreatePost} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/create-author"
                      element={isLoggedIn ? <CreateAuthor /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
