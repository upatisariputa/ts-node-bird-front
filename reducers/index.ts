import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태
// const rootReducer = combineReducers({
//   index: (state: object = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log("HYDRATE", action);
//         return { ...state, ...action.payload };
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("하이드레이트", action);
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({ user, post });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
