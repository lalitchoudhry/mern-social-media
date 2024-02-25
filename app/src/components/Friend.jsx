import React from 'react';
import { useNavigate } from "react-router-dom";

// STATES IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state/index";

// API IMPORTS
import { updateUserFriendsLists } from '../apis/user';

// STYLES IMPORTS
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

// COMPONENTS IMPORTS
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

function Friend({ friendId, name, subtitle, userPicturePath, isProfile }) {
  // STATES AND VARIABLE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = (friends || []).find((friend) => friend._id === friendId);

  // FUNCTIONS
  const patchFriend = async () => {
    
    const data = await updateUserFriendsLists(_id, friendId, token);
    dispatch(setFriends({ friends: data }));
  };

  // useEffects

  return (
    <FlexBetween >
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {(_id !== friendId && !isProfile) && <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark, "&:hover": {color: "#3F72AF" } }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark, "&:hover": {color: "#3F72AF" } }} />
        )}
      </IconButton>}
    </FlexBetween>
  )
}

export default Friend;