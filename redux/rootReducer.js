import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import storeReducer from './store/store.reducer';
import userReducer from './user/user.reducer';
import onDemandReducer from './onDemand/onDemand.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['store', 'user', 'onDemand'],
};

const rootReducer = combineReducers({
  store: storeReducer,
  user: userReducer,
  onDemand: onDemandReducer,
});

export default persistReducer(persistConfig, rootReducer);
