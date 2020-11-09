import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { meProps } from "../@types";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { RootState } from "../reducers";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from "../reducers/user";

const Profile = () => {
  const dispatch = useDispatch();
  const me: meProps = useSelector((state: RootState) => state.user.me);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="following List" data={me.Followings} />
        <FollowList header="follower List" data={me.Followers} />
      </AppLayout>
    </>
  );
};
export default Profile;
