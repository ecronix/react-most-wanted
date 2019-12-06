/* eslint-disable react/jsx-key */
import React from 'react'
import RestrictedRoute from '../../containers/RestrictedRoute'
import makeLoadable from '../../containers/MyLoadable'
import { Route } from 'react-router-dom'

const getAppRoutes = firebaseLoader => {
  const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: firebaseLoader }, preloadComponents)

  const AsyncSignIn = MyLoadable({ loader: () => import('../../pages/SignIn') })
  const AsyncUser = MyLoadable({ loader: () => import('../../pages/Users/User') })
  const AsyncUsers = MyLoadable({ loader: () => import('../../pages/Users/Users') }, [AsyncUser])
  const AsyncMyAccount = MyLoadable({ loader: () => import('../../pages/MyAccount') })
  const AsyncRole = MyLoadable({ loader: () => import('../../pages/Roles/Role') })
  const AsyncRoles = MyLoadable({ loader: () => import('../../pages/Roles/Roles') }, [AsyncRole])

  const AsyncCreateChat = MyLoadable({ loader: () => import('../../pages/Chats/CreateChat') })
  const AsyncChats = MyLoadable({ loader: () => import('../../pages/Chats/Chats') })
  const AsyncChatsEdit = MyLoadable({ loader: () => import('../../pages/Chats/ChatsEdit') })
  const AsyncPublicChats = MyLoadable({ loader: () => import('../../pages/Chats/PublicChats') })
  const AsyncPageNotFound = MyLoadable({ loader: () => import('../../pages/PageNotFound') })

  return [
    <RestrictedRoute type="public" path="/signin" component={AsyncSignIn} />,
    <RestrictedRoute type="private" path="/users" exact component={AsyncUsers} />,
    <RestrictedRoute type="private" path="/users/:select" exact component={AsyncUsers} />,
    <RestrictedRoute type="private" path="/users/edit/:uid/:editType" exact component={AsyncUser} />,
    <RestrictedRoute type="private" path="/users/edit/:uid/:editType/:rootPath/:rootUid" exact component={AsyncUser} />,
    <RestrictedRoute type="private" path="/my_account" exact component={AsyncMyAccount} />,
    <RestrictedRoute type="private" path="/roles" exact component={AsyncRoles} />,
    <RestrictedRoute type="private" path="/roles/edit/:uid/:editType" exact component={AsyncRole} />,
    <RestrictedRoute type="private" path="/public_chats" exact component={AsyncPublicChats} />,
    <RestrictedRoute type="private" path="/chats" exact component={AsyncChats} />,
    <RestrictedRoute type="private" path="/chats/create" exact component={AsyncCreateChat} />,
    <RestrictedRoute type="private" path="/chats/edit/:uid" exact component={AsyncChatsEdit} />,
    <Route component={AsyncPageNotFound} />
  ]
}

export default getAppRoutes
