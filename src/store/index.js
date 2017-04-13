import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, autoRehydrate} from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default function configureStore(history) {
  let store;

  const logger = createLogger({

  });

  const initState={
    locale: 'de',
    theme: 'dark',
  };

  let middlewares=[routerMiddleware(history), thunk];


  if (process.env.NODE_ENV !== 'production') {

    //DEV middlewares
    middlewares.push(logger);

  }

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer,
  ));

  try{
    persistStore(store, {blacklist:['router'] }, ()=>{});
  }catch(e){

  }


  return store;
}
