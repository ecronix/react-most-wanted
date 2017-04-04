import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers';
import { persistStore, autoRehydrate} from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default function configureStore(history) {
  let store;

  const logger = createLogger({

  });

  const initState={
  };

  let middlewares=[]


  if (process.env.NODE_ENV === 'production') {

    //PROD middlewares
    middlewares=[
      routerMiddleware(history)
    ];

  }else{

    //DEV middlewares
    middlewares=[
      routerMiddleware(history),
      logger
    ];

  }

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer,
  ));

  try{
    persistStore(store, { whitelist : ['responsiveDrawer', 'theme', 'locale']}, ()=>{});
  }catch(e){

  }


  return store;
}
