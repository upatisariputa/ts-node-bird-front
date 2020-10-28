import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Card } from "antd";

import { logoutAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card actions={[<div key="twit">Tweet Tweeting</div>, <div key="followings">Follwing</div>, <div key="followers">Follwers</div>]}>
      <Card.Meta avatar={<Avatar>US</Avatar>} title="Upatisariputa" />
      <Button onClick={onLogOut}>LogOut</Button>
    </Card>
  );
};

export default UserProfile;
