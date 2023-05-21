import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default function reducer(state = { isLoading: true, posts: [] }, action) {
  const stateClone = structuredClone(state);

  switch (action.type) {
    case START_LOADING:
      return { stateClone, isLoading: true };
    case END_LOADING:
      return { stateClone, isLoading: false };
    case FETCH_ALL:
      console.log('payload:', action.payload);
      return {
        stateClone,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { stateClone, posts: action.payload.data };
    case FETCH_BY_CREATOR:
      return { stateClone, posts: action.payload.data };
    case FETCH_POST:
      return { stateClone, post: action.payload.post };
    case LIKE:
      return { stateClone, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case COMMENT:
      return {
        stateClone,
        posts: state.posts.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CREATE:
      return { stateClone, posts: [stateClone.posts, action.payload] };
    case UPDATE:
      return { stateClone, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { stateClone, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};