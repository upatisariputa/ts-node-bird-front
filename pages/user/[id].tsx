import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { END } from "redux-saga";
import { Avatar, Card } from "antd";

import axios from "axios";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import PostCard from "../../components/PostCard";
import AppLayout from "../../components/AppLayout";
import { RootState } from "../../reducers";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state: RootState) => state.post);
  const { userInfo, me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);
  console.log(userInfo, me);
  return (
    <>
      <AppLayout>
        {userInfo && (
          <Head>
            <title>Post of {userInfo.nickname}</title>
            <meta name="description" content={`post of ${userInfo.nickname}`} />
            <meta property="og:title" content={`post of ${userInfo.nickname}`} />
            <meta property="og:description" content={`post of${userInfo.nickname}`} />
            <meta property="og:imgae" content={`http://localhost:3000/favicon.ico`} />
            <meta property="og:url" content={`http://localhost:3000/user/${id}`} />
          </Head>
        )}
        {userInfo && userInfo.id !== me?.id ? (
          <Card
            style={{ marginBottom: 20 }}
            actions={[
              <div key="twit">
                twitle <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                following <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                follower <br /> {userInfo.Followers}
              </div>,
            ]}>
            <Card.Meta avatar={<Avatar>{userInfo.nickname[0]} </Avatar>} title={userInfo.nickname} />
          </Card>
        ) : null}
        {mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
        ))}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
