import React from "react";

import Navbar from "../../components/Navbar";
import UserCard from "../../components/UserCard";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import FriendListComponent from "../../components/FriendListBox";
import AdvertiseComponent from "../../components/AdvertiseComponent";
import MyPostCard from "../../components/MyPostCard";
import PostsContainer from "../../components/PostsContainer";

function HomePage() {

  // STATES AND VARIABLE
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);

  // useEffect

  return (
    <Box>
      <Navbar />
      <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserCard {...user} />
        </Box>
        <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostCard picturePath={user.picturePath} />
          <PostsContainer userId={user._id}/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertiseComponent />
            <Box m="2rem 0" />
            <FriendListComponent userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
