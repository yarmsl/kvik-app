import {GET_USER, SET_LIKE} from '../../constants';

export interface FavoritesTypes {
  post_id: number;
  comment: string | '';
  condition: boolean;
}

export interface UserModel {
  about: string | null;
  createdAt: Date;
  email: string | null;
  favorites: FavoritesTypes[] | [];
  name: string;
  phone: string;
  raiting: number | null;
  subscriptions: '[]' | string; //типизировать в функции getUser
  userPhoto?: string;
}

export interface ActionUser {
  type: string;
  user?: UserModel;
  like?: FavoritesTypes;
}

const initialState = {} as UserModel;

const userReducer = (state = initialState, action: ActionUser): UserModel => {
  switch (action.type) {
    case GET_USER:
      return action.user as UserModel;
    case SET_LIKE:
      return {
        ...state,
        favorites:
          state.favorites.length > 0
            ? state.favorites.filter(
                fav => fav.post_id === action.like?.post_id,
              ).length === 1
              ? [
                  ...state.favorites.filter(
                    fav => fav.post_id !== action.like?.post_id,
                  ),
                  action.like as FavoritesTypes,
                ]
              : [...state.favorites, action.like as FavoritesTypes]
            : [action.like as FavoritesTypes],
      };
    default:
      return state;
  }
};

export default userReducer;
