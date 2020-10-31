import shortId from "shortid";

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
        { id: shortId.generate(), src: "http://postfiles8.naver.net/MjAxNzA0MzBfMjA0/MDAxNDkzNTYwODExNTg2.KyMXgiIveMj03hNVXHqCalQq1hJmGSTPWblOTPv37mUg.nb7HVsmnAHX5LmyVEbKggDvd4lnoq0ImK4NcFbwiURYg.JPEG.djadbwls32/resized_20160819_203247_-1630600415.jpg?type=w2" },
        { id: shortId.generate(), src: "http://postfiles9.naver.net/MjAxNzA0MzBfMjEx/MDAxNDkzNTYwODExNTky.xnXbM8XDvNC21ilkUeoMqLCpM4aIIvm6sNhEF2vNqG0g.Y6VSfHYkqNnqhb4x2IhBgytkdLEJwzC30yO6gAZA2WAg.JPEG.djadbwls32/resized_20160819_203248_-1361446025.jpg?type=w2" },
        { id: shortId.generate(), src: "http://img.theqoo.net/img/ZktRl.jpg" },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "sana",
          },
          content: "Twice!!",
        },
        {
          User: {
            id: shortId.generate(),
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

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

const dummypost = (data) => ({
  id: data.id,
  content: data.content,
  User: { id: 1, nickname: "mina" },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: { id: "1", nickname: "mina" },
});

const reducer = (state = initialState, action) => {
  console.log("리듀서 액션", action);
  switch (action.type) {
    // add post
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummypost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    // remove post
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id === action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    // add comment
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      console.log("성공액선", action);
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
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
