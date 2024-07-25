import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AllPosts from './pages/AllPosts';
import PostView from './pages/PostView';
import CreatePost from './pages/CreatePost';
import CreateAuthor from './pages/CreateAuthor';
import PostUpdate from './pages/PostUpdate';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");
    const [posts, setPosts] = useState([]);

    // Function to fetch posts
    const fetchPosts = async () => {
      try {
          const response = await fetch("https://blog-api-app.fly.dev/cms/posts", { 
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
          
          });
          if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          return data.posts;
      } catch (error) {
          console.log(error);
      }
    };


    const handleLogin = async (username, password) => {
        try {
          const response = await fetch("https://blog-api-app.fly.dev/cms/login", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setAuthorId(data.authorId);
            setAuthorUsername(data.username);
            return null;
          } else {
            // handle errors and respond with information
            console.log("Login Failed: ", response.status, response.statusText);
            const errorData = await response.json();
            return errorData.message
          }
        } catch (error) {
          console.log("Error logging in: ", error);
          return "An unexpected error occurred. Please try again.";
        }
    };

    const handleLogout = async () => {
        try {
          const response = await fetch("https://blog-api-app.fly.dev/cms/logout", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          });
          if (response.ok) {
            setIsLoggedIn(false);
            setAuthorId(null);
            setAuthorUsername("");
          } else {
            console.log("Logout Failed: ", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
    };


    const handleCreatePost = (newPost) => {
        setPosts([...posts, { ...newPost, id: posts.length + 1, comments: [] }]);
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    const handlePublish = async (postId, isPublished) => {
      try {
          const response = await fetch(`https://blog-api-app.fly.dev/cms/posts/${postId}/${isPublished ? 'unpublish' : 'publish'}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: 'include',
          });
          if (response.ok) {
              setPosts(posts.map(post => 
                  post.id === postId ? { ...post, published: !isPublished } : post
              ));
          } else {
              console.log(`Failed to ${isPublished ? 'unpublish' : 'publish'} post: `, response.status, response.statusText);
          }
      } catch (error) {
          console.error(`Error ${isPublished ? 'unpublishing' : 'publishing'} post:`, error);
      }
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
      console.log(`Logged in: ${isLoggedIn}`);
    }, [isLoggedIn])

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} authorUsername={authorUsername}/>
            <div className="outlet">
                <Routes>
                    <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
                    <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                    <Route
                      path="/all-posts"
                      element={
                        isLoggedIn ? (
                          <AllPosts />
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
                            handlePublish={handlePublish}
                            handleUpdate={(postId) => navigate(`/posts/update_post/${postId}`)}
                            handleDelete={handleDeletePost}
                            handleDeleteComment={handleDeleteComment}
                          />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/posts/update_post/:postId"
                      element={isLoggedIn ? <PostUpdate authorId={authorId}/> : <Navigate to="/login" />}
                    />
                    <Route
                      path="/create-post"
                      element={
                        isLoggedIn ? (
                          <CreatePost handleCreatePost={handleCreatePost} authorId={authorId} />
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
