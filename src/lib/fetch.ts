import {AuthData} from '../../screens/Login';
import {getUserData} from '../../screens/Profile';
import {RegData} from '../../screens/Registration';
import {BASE_URL, STATIC_URL} from '../constants';
import {sendLikeComment} from '../state/actions/user.actions';
import {PostModel} from '../state/reducers/postsReducer';
import {UserModel} from '../state/reducers/userReducer';
import {text2Bool} from './services';

interface regDataPost {
  phone: string;
}

export const getDataByPost = async <T>(
  url: string,
  data: AuthData | getUserData | sendLikeComment | regDataPost | RegData,
): Promise<T> => {
  console.log(data);
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(r => r.json())
    .catch(e => console.error(e));
  return await response;
};

export const getUser = async (id: number): Promise<UserModel> => {
  const userInfo = await fetch(`${BASE_URL}/api/getUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  }).then(r => r.text());
  return await await JSON.parse(userInfo, (key, value) => {
    switch (key) {
      case 'createdAt':
        return new Date(value);
      case 'favorites':
        if (JSON.parse(value).length === 0) {
          return [];
        }
        return JSON.parse(value, (k, v) => {
          switch (k) {
            case 'post_id':
              return +v;
            case 'condition':
              return text2Bool(v);
            default:
              return v;
          }
        });
      case 'userPhoto':
        if (value === null) {
          return undefined;
        }
        return `${STATIC_URL}/${value}`;
      default:
        return value;
    }
  });
};

export const getPosts = async (): Promise<PostModel[]> => {
  const posts = await fetch(`${BASE_URL}/api/getPosts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({of: 0}),
  }).then(r => r.text());
  return await JSON.parse(posts, (key, value) => {
    switch (key) {
      case 'category_id':
        return value.split(',');
      case 'created_at':
        return new Date(value);
      case 'photo':
        return JSON.parse(value).photos.map(
          (photo: string) => `${STATIC_URL}/${photo}`,
        );
      case 'price':
        return +value;
      default:
        return value;
    }
  });
};
