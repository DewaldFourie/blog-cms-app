import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Function to fetch a single post
const fetchPost = async (post_id) => {
    try {
        const response = await fetch(`https://blog-api-app.fly.dev/cms/posts/${post_id}`, { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
                credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data.post;
    } catch (error) {
        console.log(error);
    }
};


const PostUpdate = ({ authorId }) => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(authorId);
    const [text, setText] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const loadPost = async (post_id) => {
            const post = await fetchPost(post_id);
            setTitle(post.title);
            setAuthor(authorId);
            setText(post.text);
            setImageURL(post.imageURL);
        }
        loadPost(postId);
    }, [postId, authorId])


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://blog-api-app.fly.dev/cms/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, text, imageURL }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <form onSubmit={handleUpdate}>
            <div className='update-form-container'>
                <div className='post-data-container'>
                    <label className='postUpdate-label'>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className='postUpdate-title-input'
                    />
                    <label className='postUpdate-label'>Blog Content:</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Content"
                        className='postUpdate-text-input'
                        
                    />
                </div>
                <div className='image-data-container'>
                    <label className='postUpdate-label'>Author:</label>
                    <input
                        type="text"
                        value={author}
                        disabled
                        className='postUpdate-author-input'
                    />
                    <div className='image-url-container'>
                        <label className='postUpdate-label'>Image URL:</label>
                        <input
                            type="text"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="Image URL"
                            className='postUpdate-imageURL-input'
                        />
                    </div>
                    <div className='image-container'>
                        <img className='postUpdate-image' src={imageURL} alt="post-image" />
                    </div>
                </div>
            </div>
            <div className='postUpdate-btn-container'>
                <button className='postUpdate-back-btn' onClick={() => navigate(`/posts/${postId}`)}>⬅︎ Back to Post</button>
                <button className='postUpdate-submit-btn' type="submit">Update Post</button>
            </div>
            
        </form>
    );
};

export default PostUpdate;

