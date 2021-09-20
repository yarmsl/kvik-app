import React from 'react';
import ThemeProvider from './src/state/context/ThemeCtx';
import {Provider as StoreProvider} from 'react-redux';
import Screens from './Screens';
import store from './src/state/store';
import BottomNavigationCtx from './src/state/context/BottomNavigationCtx';
import {getUserId} from './src/state/actions/auth.actions';
import {ActionAuth} from './src/state/reducers/authReducer';
import {ThunkDispatch} from 'redux-thunk';
import {rootModel} from './src/state/reducers/rootReducer';
import {ActionPosts} from './src/state/reducers/postsReducer';
import {getPostsData} from './src/state/actions/posts.actions';

const App = (): JSX.Element => {
  //Проверка и запрос id из сессии
  (store.dispatch as ThunkDispatch<rootModel, unknown, ActionAuth>)(
    getUserId(),
  );
  //Все объявления
  (store.dispatch as ThunkDispatch<rootModel, unknown, ActionPosts>)(
    getPostsData(),
  );
  return (
    <StoreProvider store={store}>
      <BottomNavigationCtx>
        <ThemeProvider>
          <Screens />
        </ThemeProvider>
      </BottomNavigationCtx>
    </StoreProvider>
  );
};

export default App;
