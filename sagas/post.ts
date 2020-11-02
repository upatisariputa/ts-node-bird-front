import { all, call, delay, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_REQUEST, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, generateDummyPost } from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortId from "shortid";

function loadPostsAPI(page) {
  return axios.get("api/post", page);
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function removePostAPI(data) {
  return axios.delete("/api/post/", data);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* loadPosts(action) {
  console.log("사가 로드 포스트", action);
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield delay(100);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: e,
    });
  }
}

function* addPost(action) {
  console.log("사가 애드포스트", action);
  const id = shortId.generate();
  try {
    // const result: AxiosResponse = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function* removePost(action) {
  console.log("사가 리무브포스트", action);
  try {
    // const result: AxiosResponse = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function* addComment(action) {
  console.log("사가 애드코맨트", action.data);
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        content: action.data,
      },
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
