import {GET_USER, SET_LIKE} from '../../constants';
import {getDataByPost, getUser} from '../../lib/fetch';
import {ActionUser, FavoritesTypes} from '../reducers/userReducer';

export interface postLikeComment extends FavoritesTypes {
  idUser?: string | number;
}

export interface sendLikeComment {
  user_id: string;
  post_id: string;
  comment: string;
  condition: string;
}

export const getUserData = (
  id: number,
): ((dispatch: (arg0: ActionUser) => void) => Promise<void>) => {
  const queryUser = async (dispatch: (arg0: ActionUser) => void) => {
    const userData = await getUser(id);
    dispatch({type: GET_USER, user: userData});
  };
  return queryUser;
};

export const setLikeAndComment = ({
  idUser,
  post_id,
  comment,
  condition,
}: postLikeComment): ActionUser => {
  const sendData = {
    user_id: `${idUser}`,
    post_id: `${post_id}`,
    comment: `${comment}`,
    condition: `${condition}`,
  };
  console.log(sendData);
  getDataByPost('/api/favorites', sendData)
    .then(r => console.log(r))
    .catch(e => console.log(e));
  return {type: SET_LIKE, like: {post_id, comment, condition}};
};
