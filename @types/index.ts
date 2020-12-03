export interface postProps {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  Images: object[];
  Comments: any[];
}

export interface userInitialStateProps {
  loadUserMyInfoLoading: boolean;
  loadUserMyInfoDone: boolean;
  loadUserMyInfoError: object | null;
  logInLoading: boolean;
  logInDone: boolean;
  logInError: object | null;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: object | null;
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: object | null;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: object | null;
  me: meProps | null;
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: object | null;
  followLoading: boolean;
  followDone: boolean;
  followError: object | null;
  unFollowLoading: boolean;
  unFollowDone: boolean;
  unFollowError: object | null;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: object | null;
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: object | null;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: object | null;
  signUpData: {};
  logInData: {};
  userInfo: object | null;
}

export type ImagePostProps = { src: string }[];

export interface meProps {
  nickname: string;
  id: number;
  Posts: any[];
  Followings: any[];
  Followers: any[];
}
