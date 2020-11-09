import React, { useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { FOLLOW_REQUEST, UN_FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unFollowLoading } = useSelector((state: RootState) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UN_FOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }

  return (
    <>
      <Button loading={followLoading || unFollowLoading} onClick={onClickButton}>
        {isFollowing ? "UnFollow" : "Follow"}
      </Button>
    </>
  );
};

export default FollowButton;
