import { meProps, userInitialStateProps } from "../@types";
import shortId from "shortid";
import produce from "immer";

export const initialState: userInitialStateProps = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unFollowLoading: false,
  unFollowDone: false,
  unFollowError: null,
  me: null,
  signUpData: {},
  logInData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UN_FOLLOW_REQUEST = "UN_FOLLOW_REQUEST";
export const UN_FOLLOW_SUCCESS = "UN_FOLLOW_SUCCESS";
export const UN_FOLLOW_FAILURE = "UN_FOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data: any): meProps => ({
  ...data,
  nickname: "mina",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: "minju" }, { nickname: "arin" }, { nickname: "sana" }],
  Followers: [{ nickname: "minju" }, { nickname: "arin" }, { nickname: "sana" }],
});

export const loginRequestAction = (data: { email: string; password: string }) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutReqeustAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state: userInitialStateProps = initialState, action) => {
  console.log("유저 리듀서 액션", action);
  return produce(state, (draft) => {
    switch (action.type) {
      // 로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error;
        break;
      // 로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      // 닉넴 변경
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.me = null;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      // 사인업
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      // 포스트 투미
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // me: {
      //   ...state.me,
      //   Posts: [{ id: action.data }, ...state.me.Posts],
      // },
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      // me: {
      //   ...state.me,
      //   Posts: state.me.Posts.filter((v) => v.id !== action.data),
      // },
      // 팔로우
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data });
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      // 언팔
      case UN_FOLLOW_REQUEST:
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      case UN_FOLLOW_SUCCESS:
        draft.unFollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
        draft.unFollowDone = true;
        break;
      case UN_FOLLOW_FAILURE:
        draft.unFollowLoading = false;
        draft.unFollowError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;

// immer 도입 전
// switch (action.type) {
//   // 로그인
//   case LOG_IN_REQUEST:
//     return {
//       ...state,
//       logInLoading: true,
//       logInDone: false,
//       logInError: null,
//     };
//   case LOG_IN_SUCCESS:
//     return {
//       ...state,
//       logInLoading: false,
//       logInDone: true,
//       me: dummyUser(action.data),
//     };
//   case LOG_IN_FAILURE:
//     return {
//       ...state,
//       logInLoading: false,
//       logInDone: false,
//       logInError: action.error,
//     };
//   // 로그아웃
//   case LOG_OUT_REQUEST:
//     return {
//       ...state,
//       logOutLoading: true,
//       logOutDone: false,
//       logOutError: null,
//     };
//   case LOG_OUT_SUCCESS:
//     return {
//       ...state,
//       logOutLoading: false,
//       logOutDone: true,
//       me: null,
//     };
//   case LOG_OUT_FAILURE:
//     return {
//       ...state,
//       logOutLoading: false,
//       logOutError: action.error,
//     };
//   // 닉넴 변경
//   case CHANGE_NICKNAME_REQUEST:
//     return {
//       ...state,
//       changeNicknameLoading: true,
//       changeNicknameDone: false,
//       changeNicknameError: null,
//     };
//   case CHANGE_NICKNAME_SUCCESS:
//     return {
//       ...state,
//       changeNicknameLoading: false,
//       changeNicknameDone: true,
//       me: null,
//     };
//   case CHANGE_NICKNAME_FAILURE:
//     return {
//       ...state,
//       changeNicknameLoading: false,
//       changeNicknameError: action.error,
//     };
//   // 사인업
//   case SIGN_UP_REQUEST:
//     return {
//       ...state,
//       signUpLoading: true,
//       signUpDone: false,
//       signUpError: null,
//     };
//   case SIGN_UP_SUCCESS:
//     return {
//       ...state,
//       signUpLoading: false,
//       signUpDone: true,
//     };
//   case SIGN_UP_FAILURE:
//     return {
//       ...state,
//       signUpLoading: false,
//       signUpError: action.error,
//     };
//   // 포스트 투미
//   case ADD_POST_TO_ME:
//     return {
//       ...state,
//       me: {
//         ...state.me,
//         Posts: [{ id: action.data }, ...state.me.Posts],
//       },
//     };
//   case REMOVE_POST_OF_ME:
//     return {
//       ...state,
//       me: {
//         ...state.me,
//         Posts: state.me.Posts.filter((v) => v.id !== action.data),
//       },
//     };
//   default:
//     return state;
// }
