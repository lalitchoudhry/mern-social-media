import React, { useEffect} from 'react';

// STATES
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/index";

// STYLES IMPORT
import { Box, Typography, useTheme } from "@mui/material";

// COMPONENTS IMPORTS
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { getUserFriends } from '../apis/user';

function FriendListBox({userId}) {
  // STATES AND VARIABLE
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // FUNCTIONS
  const getFriends = async () => {
    const data = await getUserFriends(userId, token);
    dispatch(setFriends({ friends: data }));
  };

  // useEffect
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends && friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListBox;