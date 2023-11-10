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

import "./index.scss";

const router = createBrowserRouter([
  {
    path: Paths.forum,
    element: <Forum />,
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
  <React.StrictMode>
    <Provider store={store}>
      {/*<ConfigProvider*/}
      {/*  theme={{*/}
      {/*    algorithm: theme.darkAlgorithm,*/}
      {/*  }}*/}
      {/*>*/}
      <Auth>
        <RouterProvider router={router}/>
      </Auth>
      {/*</ConfigProvider>*/}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
