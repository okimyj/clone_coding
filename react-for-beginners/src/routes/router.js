import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <Detail />,
  },
]);
export default router;
