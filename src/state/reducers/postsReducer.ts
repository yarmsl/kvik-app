import {GET_POSTS} from '../../constants';

export interface verifyM {
  verify: string[]; //Типизировал по здравому смыслу, не нзаю что это
}

export interface PostModel {
  address: string;
  category_id: string[];
  commercial: 0 | 1 | 2; //требуется строгая типизация
  created_at: Date;
  delivery: boolean;
  email: string | null;
  id: number | string; //Ввести на проекте строгую типизацию id, псоле выбора шифрования id
  old_price: number | null;
  phone: string | null;
  photo: string[];
  price: number;
  raiting: number;
  reviewed: number;
  secure_transaction: boolean;
  title: string;
  trade: boolean;
  user_id: number | string; //Ввести на проекте строгую типизацию id, псоле выбора шифрования id
  verify_moderator: verifyM;
}

export interface ActionPosts {
  type: string;
  posts: PostModel[];
}

const initialState = [] as PostModel[];

const postsReducer = (
  state = initialState,
  action: ActionPosts,
): PostModel[] => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;
