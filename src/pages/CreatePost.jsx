import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ authorId }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(authorId);
    const [text, setText] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        setAuthor(authorId);
    }, [authorId]);


    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://blog-api-app.fly.dev/cms/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, text, imageURL }),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            navigate('/all-posts')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='create-post-header-container'>
                <h2 className='create-post-header'>Create a new BLOG post here</h2>
            </div>
            <form onSubmit={handleCreate}>
                <div className='update-form-container'>
                    <div className='post-data-container'>
                        <label className='postUpdate-label'>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='postUpdate-title-input'
                        />
                        <label className='postUpdate-label'>Blog Content:</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
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
                                className='postUpdate-imageURL-input'
                            />
                        </div>
                        <div className='image-container'>
                            <img className='postUpdate-image' src={imageURL} alt="post-image" />
                        </div>
                    </div>
                </div>
                <button className='postUpdate-submit-btn' type="submit">Create New Post</button>
            </form>
        </>

    );
};

export default CreatePost;
