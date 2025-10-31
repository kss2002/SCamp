import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from './route/routeConfig';

const router = createBrowserRouter(routeConfig);

export function Routes() {
  return <RouterProvider router={router} />;
}
