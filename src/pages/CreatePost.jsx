import React, { useEffect, useState } from 'react';

const CreatePost = ({ handleCreatePost, authorId }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(authorId);
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [published, setPublished]= useState(false);

    const createPost = (e) => {
        e.preventDefault();
        handleCreatePost({ title, author, content, imageURL });
    };

    useEffect(() => {
        setAuthor(authorId);
    }, [authorId]);

    return (
        <>
            <div className='create-post-header-container'>
                <h2 className='create-post-header'>Create a new BLOG post here</h2>
            </div>
            <form onSubmit={createPost}>
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
