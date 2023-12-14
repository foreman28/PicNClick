import React from "react";

// Store & Router
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import ruRU from 'antd/lib/locale/ru_RU';

import { store } from "./store/store";
import { Paths } from "./paths";
import { Auth } from "./features/auth/auth";
import { theme } from "./themes/main";

// Pages
import {Register} from "./pages/Register/Register";
import {Login} from "./pages/Login/Login";
import {Home} from "./pages/Home/Home";
import {Forum} from "./pages/Forum/Forum";
import {Search} from "./pages/Search/Search";
import {Tags} from "./pages/Tags/Tags";
import {NotFound} from "./pages/NotFound/NotFound";
import {Post} from "./pages/Post/Post";
import {Users} from "./pages/Users/Users";
import {AddPost} from "./pages/Add-post/Add-post";
import {Profile} from "./pages/Profile/Profile";

import "./index.scss";
import {YourPosts} from "./pages/YourPosts/YourPosts";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Home/>,
  },
  {
    path: Paths.search,
    element: <Search/>,
  },

  {
    path: Paths.forum,
    element: <Forum/>,
  },
  {
    path: Paths.yourPosts,
    element: <YourPosts/>,
  },
  {
    path: Paths.addPost,
    element: <AddPost/>,
  },

  {
    path: `${Paths.forum}/:id`,
    element: <Post/>,
  },

  {
    path: Paths.tags,
    element: <Tags/>,
  },
  {
    path: Paths.users,
    element: <Users/>,
  },

  {
    path: `${Paths.profile}?/:id`,
    element: <Profile/>,
  },

  {
    path: Paths.login,
    element: <Login/>,
  },
  {
    path: Paths.register,
    element: <Register/>,
  },

  {
    path: Paths.all,
    element: <NotFound/>,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <>
    <Provider store={store}>
      <ConfigProvider
        theme={theme}
        locale={ruRU}
      >
        <Auth>
          <RouterProvider router={router}/>
        </Auth>
      </ConfigProvider>
    </Provider>
    </>
);

