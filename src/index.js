import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Root } from './containers/Root';
import { addLocalizationData } from './locales';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();


//injectTapEventPlugin(); //Impementation without ignore of ghost clicks
injectTapEventPlugin({ignoreMouseThreshold: 1200}); //Ignores ghost clicks on mobile devices

addLocalizationData();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
