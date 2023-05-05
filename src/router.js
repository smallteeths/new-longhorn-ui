import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import { Dashboard } from './page/dashboard/dashboard';
import { APP } from './page/app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <APP />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ]
  },
]);

export default router
