import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers';
import { persistStore, autoRehydrate} from 'eclifford-redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default function configureStore(history) {
  let store;

  const logger = createLogger({
    // ...options
  });

  const initState={
    //Initial state
  };

  const middlewares=[
    routerMiddleware(history),
    logger
  ];

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer,
  ));

  //syncReduxAndTitle(store);

  try{
    persistStore(store, { whitelist : ['responsiveDrawer', 'theming']}, ()=>{});
  }catch(e){

  }


  return store;
}
