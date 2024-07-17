import React from 'react';
import { Link } from 'react-router-dom';



const AllPosts = ({ posts }) => {
    return (
        <div className="grid">
            {posts.map((post) => (
                <div key={post._id}>
                    <Link to={`/posts/${post._id}`}>
                        <div>
                            <h1>{post.title}</h1>
                            <span>{post.author.username}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AllPosts;
