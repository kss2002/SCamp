import Layout from '../layout/Layout';
import Ai from '../pages/ai/Ai';
import Board from '../pages/board/Board';
import BoardDetail from '../pages/board/BoardDetail';
import Home from '../pages/main/Home';
import News from '../pages/news/News';
import NotFound from '../pages/not/NotFound';

export const routeConfig = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ai',
        element: <Ai />,
      },
      {
        path: '/board',
        element: <Board />,
      },
      {
        path: '/board/:id',
        element: <BoardDetail />,
      },
      {
        path: '/news',
        element: <News />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
