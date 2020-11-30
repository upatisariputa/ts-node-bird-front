import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { END } from "redux-saga";

import axios from "axios";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import PostCard from "../../components/PostCard";
import AppLayout from "../../components/AppLayout";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { RootState } from "../../reducers";

const Post = () => {
  const { singlePost } = useSelector((state: RootState) => state.post);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <AppLayout>
        <Head>
          <title>{singlePost.User.nickname}</title>
          <meta name="description" content={singlePost.content} />
          <meta property="og:title" content={`${singlePost.User.nickname}`} />
          <meta property="og:description" content={singlePost.content} />
          <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : "http://localhost:3000/favicon.ico"} />
          <meta property="og:url" content={`http://localhost:3065/post/${id}`} />
        </Head>
        <PostCard post={singlePost} />
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
  context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
  context.store.dispatch({ type: LOAD_POST_REQUEST, data: context.params.id });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default Post;
