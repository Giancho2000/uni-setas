import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { appRoutes } from './config/routes';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

const children: RouteObject[] = [
  ...appRoutes.map<RouteObject>((route) =>
    route.path === '/'
      ? { index: true, element: route.element }
      : { path: route.path.slice(1), element: route.element },
  ),
  { path: '*', element: <NotFoundPage /> },
];

const router = createBrowserRouter([{ path: '/', element: <Layout />, children }], {
  basename: import.meta.env.BASE_URL,
});

export function App() {
  return <RouterProvider router={router} />;
}
