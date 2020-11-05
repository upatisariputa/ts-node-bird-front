import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card } from "antd";

import { logoutReqeustAction } from "../reducers/user";
import { RootState } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state: RootState) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutReqeustAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          Tweet Tweeting
          <br /> {me.Posts.length}
        </div>,
        <div key="followings">
          Following
          <br /> {me.Followings.length}
        </div>,
        <div key="followers">
          Followers
          <br /> {me.Followers.length}
        </div>,
      ]}>
      <Card.Meta avatar={<Avatar>{me.nickname.slice(0, 2)}</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut}>LogOut</Button>
    </Card>
  );
};

export default UserProfile;
