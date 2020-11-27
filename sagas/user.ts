import { all, call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse, AxiosStatic } from "axios";
import { LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_IN_REQUEST, LOG_OUT_REQUEST, UN_FOLLOW_FAILURE, FOLLOW_SUCCESS, UN_FOLLOW_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, UN_FOLLOW_REQUEST, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_SUCCESS, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE } from "../reducers/user";

function loadUserAPI(data) {
  return axios.get("/user");
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: e.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data,
    });
  }
}

function signUpAPI(signUpData) {
  return axios.post("/user", signUpData);
}

function* signUp(action) {
  try {
    console.log("사인업 액션", action);
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.error(e.response);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type: UN_FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UN_FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch("user/nickname", { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: e.response.data,
    });
  }
}

function followersAPI(data) {
  return axios.get(`/user/followers`);
}

function* followers(action) {
  try {
    const result = yield call(followersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e.response.data,
    });
  }
}

function followingsAPI(data) {
  return axios.get(`/user/followings`);
}

function* followings(action) {
  try {
    const result = yield call(followingsAPI, action.data);
    console.log("사가팔로잉", result.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UN_FOLLOW_REQUEST, unFollow);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollwer() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, followers);
}

function* watchLoadFollwings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, followings);
}

export default function* userSaga(): Generator {
  yield all([fork(watchLoadUser), fork(watchLogIn), fork(watchLogOut), fork(watchSignUp), fork(watchFollow), fork(watchUnFollow), fork(watchChangeNickname), fork(watchLoadFollwer), fork(watchLoadFollwings), fork(watchRemoveFollower)]);
}
