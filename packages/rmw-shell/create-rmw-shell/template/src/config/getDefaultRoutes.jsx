import React from "react";
import { AuthorizedRoute, UnauthorizedRoute } from "@ecronix/base-shell";
import {
  SignInPage,
  MyAccountPage,
  UsersPage,
  UserPage,
  RolesPage,
  RolePage,
  ChatsPage,
  CreateChatPage,
  GroupChatPage,
  EditMembersPage,
  EditAdminsPage,
} from "@ecronix/rmw-shell";
import { NotFoundPage } from "../pages/PageNotFound";

const getDefaultRoutes = (appConfig) => {
  return [
    {
      path: "/signin",
      exact: true,
      element: (
        <UnauthorizedRoute>
          <SignInPage redirectTo={appConfig?.auth?.redirectTo || "/"} />
        </UnauthorizedRoute>
      ),
    },

    {
      path: "/chats",
      exact: true,
      element: (
        <AuthorizedRoute>
          <ChatsPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/chats/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <ChatsPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/create_chat",
      exact: true,
      element: (
        <AuthorizedRoute>
          <CreateChatPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/edit_members/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <EditMembersPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/edit_admins/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <EditAdminsPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/group_chat",
      exact: true,
      element: (
        <AuthorizedRoute>
          <GroupChatPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/group_chat/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <GroupChatPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/roles",
      exact: true,
      element: (
        <AuthorizedRoute>
          <RolesPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/create_role",
      exact: true,
      element: (
        <AuthorizedRoute>
          <RolePage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/roles/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <RolePage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/roles/:uid/:tab",
      exact: true,
      element: (
        <AuthorizedRoute>
          <RolePage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/my_account",
      exact: true,
      element: (
        <AuthorizedRoute>
          <MyAccountPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <AuthorizedRoute>
          <UsersPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/users/:uid",
      exact: true,
      element: (
        <AuthorizedRoute>
          <UserPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "/users/:uid/:tab",
      exact: true,
      element: (
        <AuthorizedRoute>
          <UserPage />
        </AuthorizedRoute>
      ),
    },
    {
      path: "*",

      element: (
        <AuthorizedRoute>
          <NotFoundPage />
        </AuthorizedRoute>
      ),
    },
  ];
};

export { getDefaultRoutes };
