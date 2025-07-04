import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Donate from 'src/views/donate/DonatePage';
import MainTable from 'src/views/dashboard/MainTable';
import Error from 'src/views/authentication/Error';
import QuestionDetail from 'src/views/dashboard/QuestionDetail';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <ModernDash /> },
      { path: '/:field/:subject', exact: true, element: <MainTable /> },
      { path: '/:field/:subject/:question', exact: true, element: <QuestionDetail /> },

      { path: '/donate', exact: true, element: <Donate /> },
      { path: '/404', exact: true, element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default Router;
