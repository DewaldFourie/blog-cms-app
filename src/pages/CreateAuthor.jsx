import React, { useState } from 'react';

const CreateAuthor = ({ handleCreateAuthor }) => {
    const [name, setName] = useState('');

    const createAuthor = (e) => {
        e.preventDefault();
        handleCreateAuthor(name);
    };

    return (
        <form onSubmit={createAuthor}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Author Name"
            />
            <button type="submit">Create Author</button>
        </form>
    );
    };

export default CreateAuthor;
