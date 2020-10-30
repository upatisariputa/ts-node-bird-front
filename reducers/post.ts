export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Mina",
      },
      content: "First comment #Hash #potato",
      Images: [
        {
          src: "http://postfiles8.naver.net/MjAxNzA0MzBfMjA0/MDAxNDkzNTYwODExNTg2.KyMXgiIveMj03hNVXHqCalQq1hJmGSTPWblOTPv37mUg.nb7HVsmnAHX5LmyVEbKggDvd4lnoq0ImK4NcFbwiURYg.JPEG.djadbwls32/resized_20160819_203247_-1630600415.jpg?type=w2",
        },
        { src: "http://postfiles9.naver.net/MjAxNzA0MzBfMjEx/MDAxNDkzNTYwODExNTky.xnXbM8XDvNC21ilkUeoMqLCpM4aIIvm6sNhEF2vNqG0g.Y6VSfHYkqNnqhb4x2IhBgytkdLEJwzC30yO6gAZA2WAg.JPEG.djadbwls32/resized_20160819_203248_-1361446025.jpg?type=w2" },
        { src: "http://img.theqoo.net/img/ZktRl.jpg" },
      ],
      Commnets: [
        {
          User: {
            nickname: "sana",
          },
          content: "Twice!!",
        },
        {
          User: {
            nickname: "chaeyong",
          },
          content: "Uh heong!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummypost = {
  id: 2,
  content: "dummy data",
  User: { id: 1, nickname: "Mina" },
  Images: [],
  Commnets: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // add post
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        mainPosts: [dummypost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    // add comment
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
