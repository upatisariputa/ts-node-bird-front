import produce from "immer";
// import shortId from "shortid";
// import faker from "faker";
import { postProps } from "../@types";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  likePosts: [],
  unlikePosts: [],
  singlePost: null,

  hasMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  removeImageLoading: false,
  removeImageDone: false,
  removeImageError: null,
};

// export const generateDummyPost = (number: number) =>
//   Array(number)
//     .fill(null)
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.image(),
//         },
//       ],
//       Comments: [
//         {
//           User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName(),
//           },
//           content: faker.lorem.sentence(),
//         },
//       ],
//     }));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// export const likePost = (data) => ({
//   type: LIKE_POST_REQUEST,
//   data,
// });

// const dummyPost = (data) => ({
//   id: data.id,
//   User: {
//     id: shortId.generate(),
//     nickname: faker.name.findName(),
//   },
//   content: data.content,
//   Images: [
//     {
//       id: shortId.generate(),
//       src: faker.image.imageUrl(),
//     },
//   ],
//   Comments: [
//     {
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.sentence(),
//     },
//   ],

//   // id: data.id,
//   // content: data.content,
//   // User: { id: 1, nickname: "mina" },
//   // Images: [{ id: shortId.generate(), src: faker.image.imageUrl() }],
//   // Comments: [
//   //   {
//   //     User: {
//   //       id: shortId.generate(),
//   //       nickname: faker.name.findName(),
//   //     },
//   //     content: faker.lorem.sentence(),
//   //   },
//   // ],
// });

// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   content: data,
//   User: { id: "1", nickname: "mina" },
// });

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => {
  console.log("리듀서 액션", action);
  return produce(state, (draft) => {
    // immer가 알아서 불변성을 지켜줌

    switch (action.type) {
      // load post
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      // load posts
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        // draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = draft.mainPosts.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      // add post
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      // remove post
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      // add comment
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      // like post
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      // unlike post
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      // retweet post
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      // upload Images
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        action.data.forEach((p) => {
          draft.imagePaths.push(p);
        });
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      // remove Images
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      // {
      //   const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      //   const post = { ...state.mainPosts[postIndex] };
      //   post.Comments = [dummyComment(action.data.content), ...post.Comments];
      //   const mainPosts = [...state.mainPosts];
      //   mainPosts[postIndex] = post;
      //   return {
      //     ...state,
      //     mainPosts,
      //     addCommentLoading: false,
      //     addCommentDone: true,
      //   };
      // }

      default:
        break;
    }
  });
};

export default reducer;

// immer 이전 리듀서
// switch (action.type) {
//   // add post
//   case ADD_POST_REQUEST:
//     return {
//       ...state,
//       addPostLoading: true,
//       addPostDone: false,
//       addPostError: null,
//     };
//   case ADD_POST_SUCCESS:
//     return {
//       ...state,
//       mainPosts: [dummyPost(action.data), ...state.mainPosts],
//       addPostLoading: false,
//       addPostDone: true,
//     };
//   case ADD_POST_FAILURE:
//     return {
//       ...state,
//       addPostLoading: false,
//       addPostError: action.error,
//     };
//   // remove post
//   case REMOVE_POST_REQUEST:
//     return {
//       ...state,
//       removePostLoading: true,
//       removePostDone: false,
//       removePostError: null,
//     };
//   case REMOVE_POST_SUCCESS:
//     return {
//       ...state,
//       mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
//       removePostLoading: false,
//       removePostDone: true,
//     };
//   case REMOVE_POST_FAILURE:
//     return {
//       ...state,
//       removePostLoading: false,
//       removePostError: action.error,
//     };
//   // add comment
//   case ADD_COMMENT_REQUEST:
//     return {
//       ...state,
//       addCommentLoading: true,
//       addCommentDone: false,
//       addCommentError: null,
//     };
//   case ADD_COMMENT_SUCCESS: {
//     console.log("성공액선", action);
//     const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
//     const post = { ...state.mainPosts[postIndex] };
//     post.Comments = [dummyComment(action.data.content), ...post.Comments];
//     const mainPosts = [...state.mainPosts];
//     mainPosts[postIndex] = post;
//     return {
//       ...state,
//       mainPosts,
//       addCommentLoading: false,
//       addCommentDone: true,
//     };
//   }
//   case ADD_COMMENT_FAILURE:
//     return {
//       ...state,
//       addCommentLoading: false,
//       addCommentError: action.error,
//     };
//   default:
//     return state;
// }
