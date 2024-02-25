import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

// COMPONENTS IMPORTS
import Navbar from "../../components/Navbar";
import FriendListBox from "../../components/FriendListBox";
import MyPostCard from "../../components/MyPostCard";
import PostsContainer from "../../components/PostsContainer";
import UserCard from "../../components/UserCard";
import { readUser } from '../../apis/user';

function ProfilePage() {
  // STATES AND VARIABLE
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const {_id} = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // FUNCTIONS
  const getUser = async () => {
    const data = await readUser(userId, token);
    setUser(data);
  };

  // useEffect
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserCard {...user} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListBox userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {_id === userId && <MyPostCard picturePath={user.picturePath} />}
          <Box m="2rem 0" />
          <PostsContainer userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage;