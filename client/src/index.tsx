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
import {Register} from "./pages/register/Register";
import {Login} from "./pages/login/Login";
import {Home} from "./pages/home/Home";
import {Forum} from "./pages/forum/Forum";
import {Search} from "./pages/search/Search";
import {Tags} from "./pages/tags/Tags";
import {NotFound} from "./pages/notFound/NotFound";
import {Post} from "./pages/post/Post";
import {Users} from "./pages/users/Users";
import {AddPost} from "./pages/add-post/Add-post";
import {Profile} from "./pages/profile/Profile";

import "./index.scss";
import {YourPosts} from "./pages/yourPosts/YourPosts";

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

