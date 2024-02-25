import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/index";

// COMPONENTS IMPORTS
import PostCard from "./PostCard";
import { readPosts, readUserPosts } from "../apis/post";

function PostsContainer({ userId, isProfile = false }) {
  // STATES AND VARIABLES
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // FUNCTIONS
  const getPosts = async () => {
    const data = await readPosts(token);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const data = await readUserPosts(userId, token);
    dispatch(setPosts({ posts: data }));
  };

  // useEffects
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts && posts.map(
        ({
          _id,
          userId,
          name,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => <PostCard
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
          />
        )}
    </>
  );
}

export default PostsContainer;
