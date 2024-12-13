import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

type RouteArrayProps = {
  path: string;
  component: React.FC;
};

export const RoutesArray: RouteArrayProps[] = [
  {
    path: '/',
    component: Home,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {RoutesArray.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <route.component />
                </>
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
