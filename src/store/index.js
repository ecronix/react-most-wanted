import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, autoRehydrate} from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { isAuthorised } from '../firebase/auth';
import { initialState } from '../store/auth/reducer';
import config from '../config';

export default function configureStore() {
  let store;

  const logger = createLogger({

  });

  const initState={
    auth: {...initialState, isAuthorised: isAuthorised()},
    ...config.initial_state
  };

  let middlewares=[thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); //DEV middlewares
  }

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer
  ));

  try{
    persistStore(store, {blacklist:['auth', 'connection', 'form'] }, ()=>{});
  }catch(e){

  }


  return store;
}
