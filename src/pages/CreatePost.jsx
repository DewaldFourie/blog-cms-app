import React, { useState } from 'react';

const CreatePost = ({ handleCreatePost }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');

    const createPost = (e) => {
        e.preventDefault();
        handleCreatePost({ title, author, content, imageURL });
    };

    return (
        <form onSubmit={createPost}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Image URL"
            />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
