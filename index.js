import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { I18nManager, StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StatusBar
        backgroundColor="black"
        setBackgroundColor="black"
        networkActivityIndicatorVisible={true}
      />

      <App />
    </PersistGate>
  </Provider>
);

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => RNRedux);
