export interface postProps {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  Images: any[];
  Commnets: any[];
}

export interface userInitialStateProps {
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
