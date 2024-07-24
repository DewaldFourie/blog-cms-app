import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


// Function to fetch posts, this will fetch the correct individual post by using ID
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
        const post = data.post;
        const comments = data.comments;
        return {post, comments};
    } catch (error) {
        console.log(error);
    }
};


const PostView = ({ handlePublish, handleUpdate, handleDelete }) => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [isPublished, setIsPublished] = useState(false);

    const { postId } = useParams();
    const navigate = useNavigate();

    const handlePublishClick = async () => {
        await handlePublish(postId, isPublished);
        setIsPublished(!isPublished);
    };

    useEffect(() => {
        const loadPost = async (post_id) => {
            const fetchedPost = await fetchPost(post_id);
            setPost(fetchedPost.post)
            setComments(fetchedPost.comments)
            setIsPublished(fetchedPost.post.published)
        }
        loadPost(postId)
        console.log(isPublished);
    }, [postId, isPublished])

    if (!post) return <div>Loading...</div>;

    return (
        <div className='post-view-container'>
            <div className='post-view-back-btn-container'>
                <button className='post-view-back-btn' onClick={() => navigate('/all-posts')}>⬅︎ All Posts</button>
            </div>
            <div className="post-view-title-container">
                <h1>{post.title}</h1>
            </div>
            <div className="post-view-author-container">
                <p>Author: {post.author.username}</p>
            </div>
            <div className="post-view-text-container">
                <div>
                    <img className='postView-image' src={post.imageURL} alt={post.title} />
                </div>
                {post.text.split('\n\n').map((paragraph, index) => (
                    <p className="postView-main-text" key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="post-view-btns-container">
                <button
                    className={`post-view-btn ${isPublished ? 'published' : 'not-published'}`}
                    onClick={handlePublishClick}
                >
                    {isPublished ? 'Unpublish Post' : 'Publish Post'}
                </button>
                <button className='post-view-btn update' onClick={() => navigate(`/posts/update_post/${postId}`)}>Update Post</button>
                <button className='post-view-btn delete' onClick={() => handleDelete(postId)}>Delete Post</button>
            </div>
            <div className='post-view-comments-container'>
                {comments.map((comment) => (
                    <div key={comment._id} className='post-view-comment-box'>
                        <div className="post-view-comment-info">
                            <h4 className='post-view-comment-author'>{comment.author}</h4>
                            <h5 className='post-view-comment-date'>{new Date(post.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</h5>
                        </div>
                        <p>{comment.text}</p>
                        <button className='post-view-comment-delete-btn' onClick={() => handleDeleteComment(postId, comment.id)}>Delete Comment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostView;
