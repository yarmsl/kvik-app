import {AUTH_ERROR, SIGN_IN, SIGN_OUT, SIGN_UP} from '../../constants';

export interface AuthModel {
  isAuth: boolean;
  idUser?: string | number;
  isset?: boolean;
  exist?: boolean;
}

export interface ActionAuth {
  type: string;
  idUser?: string;
  error?: boolean;
}

const initialState = {isAuth: false};

const authReducer = (state = initialState, action: ActionAuth): AuthModel => {
  switch (action.type) {
    case SIGN_IN:
      return {isAuth: true, idUser: action.idUser};
    case AUTH_ERROR:
      return {isAuth: false, isset: action.error};
    case SIGN_UP:
      return {isAuth: true, idUser: action.idUser};
    case AUTH_ERROR:
      return {isAuth: false, exist: action.error};
    case SIGN_OUT:
      return {isAuth: false};
    default:
      return state;
  }
};

export default authReducer;
