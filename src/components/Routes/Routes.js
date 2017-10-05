import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent   from '../../components/LoadingComponent/LoadingComponent';
import { RestrictedRoute }   from '../../containers/RestrictedRoute';
import { Route, Switch } from 'react-router-dom';

function MyLoadable(opts, preloadComponents) {

  return Loadable(Object.assign({
    loading: LoadingComponent,
    render(loaded, props) {

      if(preloadComponents!==undefined && preloadComponents instanceof Array){
        preloadComponents.map(component=>component.preload());
      }

      let Component = loaded.default;
      return <Component {...props}/>;
    }
  }, opts));
};

const AsyncDashboard = MyLoadable({loader: () => import('../../containers/Dashboard/Dashboard')});
const AsyncDocument = MyLoadable({loader: () => import('../../containers/Document/Document')});
const AsyncCollection = MyLoadable({loader: () => import('../../containers/Collection/Collection')});
const AsyncAbout = MyLoadable({loader: () => import('../../containers/About/About')});
const AsyncPublicChats = MyLoadable({loader: () => import('../../containers/PublicChats/PublicChats')});
const AsyncMyAccount = MyLoadable({loader: () => import('../../containers/MyAccount/MyAccount')});

const AsyncPredefinedChatMessages = MyLoadable({loader: () => import('../../containers/PredefinedChatMessages/PredefinedChatMessages')});


const AsyncTask = MyLoadable({loader: () => import('../../containers/Tasks/Task')});
const AsyncTasks = MyLoadable({loader: () => import('../../containers/Tasks/Tasks')}, [AsyncTask]);

const AsyncRole = MyLoadable({loader: () => import('../../containers/Roles/Role')});
const AsyncRoles = MyLoadable({loader: () => import('../../containers/Roles/Roles')}, AsyncRole);

const AsyncChat = MyLoadable({loader: () => import('../../containers/Chats/Chat')});
const AsyncCreateChat = MyLoadable({loader: () => import('../../containers/Chats/CreateChat')});
const AsyncChats = MyLoadable({loader: () => import('../../containers/Chats/Chats')}, [AsyncChat, AsyncCreateChat]);

const AsyncCompany = MyLoadable({loader: () => import('../../containers/Companies/Company')});
const AsyncCompanies = MyLoadable({loader: () => import('../../containers/Companies/Companies')}, [AsyncCompany]);

const AsyncUser = MyLoadable({loader: () => import('../../containers/Users/User')});
const AsyncUsers = MyLoadable({loader: () => import('../../containers/Users/Users')}, [AsyncUser]);

const AsyncSignIn = MyLoadable({loader: () => import('../../containers/SignIn/SignIn')});
const AsyncPageNotFound = MyLoadable({loader: () => import('../../components/PageNotFound/PageNotFound')});

const Routes = (props, context) => {

  return (
    <Switch >
      <RestrictedRoute type='private' path="/" exact component={AsyncDashboard} />
      <RestrictedRoute type='private' path="/dashboard" exact component={AsyncDashboard} />

      <RestrictedRoute type='private' path="/loading" exact component={LoadingComponent} />

      <RestrictedRoute type='private' path="/public_chats" exact component={AsyncPublicChats} />

      <RestrictedRoute type='private' path="/tasks" exact component={AsyncTasks} />
      <RestrictedRoute type='private' path="/tasks/edit/:uid" exact component={AsyncTask} />
      <RestrictedRoute type='private' path="/tasks/create" exact component={AsyncTask} />

      <RestrictedRoute type='private' path="/roles" exact component={AsyncRoles} />
      <RestrictedRoute type='private' path="/roles/edit/:uid" exact component={AsyncRole} />
      <RestrictedRoute type='private' path="/roles/create" exact component={AsyncRole} />

      <RestrictedRoute type='private' path="/companies" exact component={AsyncCompanies} />
      <RestrictedRoute type='private' path="/companies/edit/:uid" exact component={AsyncCompany} />
      <RestrictedRoute type='private' path="/companies/create" exact component={AsyncCompany} />

      <RestrictedRoute type='private' path="/predefined_chat_messages" exact component={AsyncPredefinedChatMessages} />

      <RestrictedRoute type='private' path="/chats" exact component={AsyncChats} />
      <RestrictedRoute type='private' path="/chats/edit/:uid" exact component={AsyncChat} />
      <RestrictedRoute type='private' path="/chats/create" exact component={AsyncCreateChat} />

      <RestrictedRoute type='private' path="/users" exact component={AsyncUsers} />
      <RestrictedRoute type='private' path="/users/edit/:uid/:editType" exact component={AsyncUser} />

      <RestrictedRoute type='private' path="/about" exact component={AsyncAbout}  />
      <RestrictedRoute type='private' path="/document" exact component={AsyncDocument}  />
      <RestrictedRoute type='private' path="/collection" exact component={AsyncCollection}  />
      <RestrictedRoute type='private' path="/my_account"  exact component={AsyncMyAccount} />
      <RestrictedRoute type='public' path="/signin" component={AsyncSignIn} />
      <Route component={AsyncPageNotFound} />
    </Switch>

  );
}

export default Routes;
