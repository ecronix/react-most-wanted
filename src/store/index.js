import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, autoRehydrate} from 'redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import config from '../config';

export default function configureStore() {
  let store;

  const logger = createLogger({

  });

  const isAuthorised = () => {

    try{
      const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
      const data = JSON.parse(localStorage.getItem(key));
      return data != null;
    }catch(ex){
      return false;
    }


  }

  const initState={
    auth: { isAuthorised: isAuthorised() },
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
    persistStore(store, {blacklist:['auth', 'form', 'connection', 'initialization', 'messaging'] }, ()=>{});
  }catch(e){

  }


  return store;
}
