import Home from '../pages/main/Home';
import NotFound from '../pages/not/NotFound';

export const routeConfig = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
