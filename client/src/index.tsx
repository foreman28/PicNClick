import React from "react";

import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store/store";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";

import {Register} from "./pages/register/Register";
import {Login} from "./pages/login/Login";
// import {Status} from "./pages/status/Status";
import {Home} from "./pages/home/Home";
import {Forum} from "./pages/forum/Forum";
import {Search} from "./pages/search/Search";
import {Tags} from "./pages/tags/Tags";
import NotFound from "./pages/notFound/NotFound";

import {Paths} from "./paths";  // Пути

import {Post} from "./pages/post/Post";
import {ConfigProvider} from "antd";
import ruRU from 'antd/lib/locale/ru_RU';

import "./index.scss";


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
    path: Paths.tags,
    element: <Tags/>,
  },

  {
    path: Paths.forum,
    element: <Forum/>,
  },
  {
    path: `${Paths.forum}/:id`,
    element: <Post/>,
  },

  {
    path: Paths.login,
    element: <Login/>,
  },
  {
    path: Paths.register,
    element: <Register/>,
  },

  // {
  //   path: `${Paths.status}/:status`,
  //   element: <Status/>,
  // },

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
        // theme={{
        //   algorithm: theme.darkAlgorithm,
        // }}
        locale={ruRU}
      >
          <RouterProvider router={router}/>
      </ConfigProvider>
    </Provider>
  </>
);

reportWebVitals();
