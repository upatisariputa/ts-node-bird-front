export interface postProps {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  Images: [];
  Commnets: [];
}

export type ImagePostProps = { src: string }[];
