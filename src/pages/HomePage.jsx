import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="grid">
            <Link to="/all-posts">All Posts</Link>
            <Link to="/create-post">Create New Post</Link>
            <Link to="/create-author">Create New Author</Link>
        </div>
    );
};

export default HomePage;
