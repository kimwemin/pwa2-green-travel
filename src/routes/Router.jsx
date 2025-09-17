import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";
import FestivalShow from "../components/festivals/FestivalShow.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/festivals',
        element: <FestivalList />
      },
      {
        path: '/festivals/:id', // 새그먼트 파라미터, 파라미터와는 별개의 데이터. 하나의 패스키 형식이니 중복된 형식으로 만들지 않도록 주의 필요
        element: <FestivalShow />
      }
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;