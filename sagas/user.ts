import { all, call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOG_IN_REQUEST, LOG_OUT_REQUEST, UN_FOLLOW_FAILURE, FOLLOW_SUCCESS, UN_FOLLOW_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, UN_FOLLOW_REQUEST } from "../reducers/user";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    console.log("사가 로그인", action);
    // const result: AxiosResponse = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
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
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    console.log("사가 로그아웃");
    // const result: AxiosResponse = yield call(logOutAPI);
    yield delay(1000);
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

function signUpAPI() {
  return axios.post("/api/signup");
}

function* signUp(action) {
  try {
    console.log("사가 사인업");
    // const result: AxiosResponse = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post("/api/follow", data);
}

function* follow(action) {
  try {
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.post("api/unfollow", data);
}

function* unFollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UN_FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: UN_FOLLOW_FAILURE,
      data: e.response.data,
    });
  }
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

export default function* userSaga(): Generator {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp), fork(watchFollow), fork(watchUnFollow)]);
}
