import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import { meProps } from "../@types";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { RootState } from "../reducers";

const Profile = () => {
  const me: meProps = useSelector((state: RootState) => state.user.me);

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
