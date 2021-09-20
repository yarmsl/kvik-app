import {GET_POSTS} from '../../constants';
import {getPosts} from '../../lib/fetch';
import {ActionPosts} from '../reducers/postsReducer';

export const getPostsData = (): ((
  dispatch: (arg0: ActionPosts) => void,
) => Promise<void>) => {
  const queryPosts = async (dispatch: (arg0: ActionPosts) => void) => {
    const posts = await getPosts();
    dispatch({type: GET_POSTS, posts: posts});
  };
  return queryPosts;
};
