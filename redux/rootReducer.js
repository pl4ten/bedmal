import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import storeReducer from './store/store.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['store', 'user'],
};

const rootReducer = combineReducers({
  store: storeReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
