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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = { type: ADD_POST };

const dummypost = {
  id: 2,
  content: "dummy data",
  User: { id: 1, nickname: "Mina" },
  Images: [],
  Commnets: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummypost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};

export default reducer;
