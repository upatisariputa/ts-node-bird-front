export interface postProps {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  Images: any[];
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
  signUpData: {};
  logInData: {};
}

export type ImagePostProps = { src: string }[];

export interface meProps {
  nickname: string;
  id: number;
  Posts: any[];
  Followings: any[];
  Followers: any[];
}
