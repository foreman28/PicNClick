import React from "react";

import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";

import {Forum} from "./pages/Forum/Forum";

import {Register} from "./pages/Register/Register";
import {Login} from "./pages/Login/Login";
import {Status} from "./pages/Status/Status";

import {Auth} from "./features/auth/auth";  // Авторизация
import {Paths} from "./paths";  // Пути

import {Post} from "./pages/Post/Post";
import {ConfigProvider} from "antd";
import ruRU from 'antd/lib/locale/ru_RU';

import "./index.scss";

import {Search} from "./pages/Search/Search";
import {Tags} from "./pages/Tags/Tags";
import NotFound from "./pages/NotFound/NotFound";


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
    path: Paths.tags,
    element: <Tags />,
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

  {
    path: Paths.all,
    element: <NotFound />,
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
