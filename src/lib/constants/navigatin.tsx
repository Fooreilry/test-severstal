import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import NotFound from "../../pages/NotFound/NotFound";
import OrdePage from "../../pages/OrdePage/OrdePage";
import ProductList from "../../pages/ProductList/ProductList";
import Home from "../../pages/Home/Home";
import Error from "../../pages/Error/Error";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductList />,
      },
      {
        path: "/order/:id",
        element: <OrdePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
