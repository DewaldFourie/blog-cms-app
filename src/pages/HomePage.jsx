import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='home-content'>
            <div className="grid home-link-container">
                <Link className='home-link-box' to="/all-posts">All Posts</Link>
                <Link className='home-link-box' to="/create-post">Create New Post</Link>
                <Link className='home-link-box' to="/create-author">Create New Author</Link>
            </div>
        </div>

    );
};

export default HomePage;
