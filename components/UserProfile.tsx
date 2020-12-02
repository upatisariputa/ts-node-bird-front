import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card } from "antd";

import { logoutReqeustAction } from "../reducers/user";
import { RootState } from "../reducers";
import Link from "next/link";

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
          <Link href={`/user/${me.id}`}>
            <a>
              짹짹
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}>
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`} prefetch={false}>
            {" "}
            <Avatar>{me.nickname.slice(0, 2)}</Avatar>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut}>LogOut</Button>
    </Card>
  );
};

export default UserProfile;
