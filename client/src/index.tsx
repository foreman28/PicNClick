import React from "react";

import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {Forum} from "./pages/forum/forum";

import {Register} from "./pages/register/register";
import {Login} from "./pages/login/login";
import {Status} from "./pages/status/status";

import {Auth} from "./features/auth/auth";  // Авторизация
import {Paths} from "./paths";  // Пути

import {Post} from "./pages/post/post";
import {ConfigProvider} from "antd";
import ruRU from 'antd/lib/locale/ru_RU';

import "./index.scss";
import {Search} from "./pages/search/search";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Forum />,
  },
  {
    path: Paths.search,
    element: <Search />,
  },

  {
    path: Paths.forum,
    element: <Forum />,
  },
  {
    path: `${Paths.forum}/:id`,
    element: <Post />,
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
    path: `${Paths.status}/:status`,
    element: <Status/>,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <ConfigProvider
        // theme={{
        //   algorithm: theme.darkAlgorithm,
        // }}
        locale={ruRU}
      >
      <Auth>
        <RouterProvider router={router}/>
      </Auth>
      </ConfigProvider>
    </Provider>
  </>
);

reportWebVitals();
