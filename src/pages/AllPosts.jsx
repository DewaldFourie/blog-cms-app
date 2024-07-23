import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const AllPosts = () => {
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

    useEffect(() => {
        const loadPosts = async () => {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
        }
        loadPosts();  
    }, [])
    
    return (
        <div className="grid">
            {posts.map((post) => (
                <div key={post._id} className={post.published ? 'all-posts-published' : 'all-posts-not-published'}>
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
