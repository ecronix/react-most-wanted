import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FirebaseProvider from 'firekit-provider';
import configureStore from './store';
import { Root } from './containers/Root';
import { addLocalizationData } from './locales';
import registerServiceWorker from './registerServiceWorker';
import {firebaseApp} from './firebase';

const store = configureStore();

addLocalizationData();

ReactDOM.render(
  <Provider store={store}>
    <FirebaseProvider firebaseApp={firebaseApp}>
      <Root />
    </FirebaseProvider>
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
