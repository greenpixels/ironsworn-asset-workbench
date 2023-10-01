/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageAssetCardEditor } from "./pages/PageAssetCardEditor.tsx";
import { PageNews } from "./pages/PageNews.tsx";
import { PageAssetCardsExplore } from "./pages/PageAssetCardsExplore.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "editors",
        children: [
          {
            path: "asset",
            element: <PageAssetCardEditor />,
          },
        ],
      },
      { path: "news", element: <PageNews /> },
      {
        path: "explore",
        children: [
          {
            path: "assets",
            element: <PageAssetCardsExplore />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
