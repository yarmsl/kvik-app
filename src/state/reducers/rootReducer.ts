import {combineReducers} from 'redux';
import authReducer, {AuthModel} from './authReducer';
import postsReducer, {PostModel} from './postsReducer';
import userReducer, {UserModel} from './userReducer';

export interface rootModel {
  auth: AuthModel;
  user: UserModel;
  posts: PostModel[];
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
