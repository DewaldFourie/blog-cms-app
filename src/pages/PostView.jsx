import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// Function to fetch posts, this will fetch the correct individual post by using ID
const fetchPost = async (post_id) => {
    try {
        const response = await fetch(`https://blog-api-app.fly.dev/posts/${post_id}`, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const post = data.post;
        const comments = data.comments;
        return {post, comments};
    } catch (error) {
        console.log(error);
    }
};

const PostView = ({ posts, handlePublish, handleUpdate, handleDelete }) => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);

    const { postId } = useParams();


    useEffect(() => {
        const loadPost = async (post_id) => {
            const fetchedPost = await fetchPost(post_id);
            setPost(fetchedPost.post)
            setComments(fetchedPost.comments)
        }
        loadPost(postId)
    }, [postId])

    if (!post) return <div>Post not found</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>Author: {post.author.username}</p>
            <p>{post.text}</p>
            <img className='postView-image' src={post.imageURL} alt={post.title} />
            <button onClick={() => handlePublish(postId)}>Publish Post</button>
            <button onClick={() => handleUpdate(postId)}>Update Post</button>
            <button onClick={() => handleDelete(postId)}>Delete Post</button>
            <div>
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p>{comment.text}</p>
                        <button onClick={() => handleDeleteComment(postId, comment.id)}>Delete Comment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostView;
