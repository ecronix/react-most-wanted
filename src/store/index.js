import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, autoRehydrate} from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { isAuthorised } from '../utils/auth';
import { initialState } from '../store/auth/reducer';

export default function configureStore(history) {
  let store;

  const logger = createLogger({

  });

  const initState={
    auth: {...initialState, isAuthorised: isAuthorised()},
  };

  let middlewares=[routerMiddleware(history), thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); //DEV middlewares
  }

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer
  ));

  try{
    persistStore(store, {blacklist:['router', 'auth', 'connection'] }, ()=>{});
  }catch(e){

  }


  return store;
}
