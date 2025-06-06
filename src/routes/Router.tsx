import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Donate from 'src/views/donate/DonatePage';
import MainTable from 'src/views/dashboard/MainTable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <ModernDash /> },
      { path: '/:field/:subject', exact: true, element: <MainTable /> },
      { path: '/donate', exact: true, element: <Donate /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
