import axios from "axios";
import { all, fork } from "redux-saga/effects";
import { backURL } from "../config/config";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
