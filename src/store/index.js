import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import { persistStore, autoRehydrate} from 'eclifford-redux-persist';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { browserHistory } from 'react-router';
//import { syncReduxAndTitle } from 'redux-title';

export default function configureStore() {
  let store;

  const initState={
    //Initial state
  };

  const middlewares=[
    routerMiddleware(browserHistory)
  ];

  store = createStore(reducers, initState, compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
    responsiveStoreEnhancer
  ));

  //syncReduxAndTitle(store);

  try{
    persistStore(store, { whitelist : ['responsiveDrawer']}, ()=>{});
  }catch(e){

  }


  return store;
}
