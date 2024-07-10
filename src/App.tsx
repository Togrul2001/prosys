import React from 'react';
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';

function MainLayout() {
  const navigate = useNavigate()
  return (
    <>
      <main style={{width:"100vw", height:"100vh"}}>
        <SidebarMenu />
        <Outlet />
      </main>
    </>);
}

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children:[
          {
            path: "lessons",
            element: <>Lessons</>
          },
          {
            path: "students",
            element: <>Students</>
          },
          {
            path: "exams",
            element: <>Exams</>
          },
        ]
      },


    ],
  },
];

function Root() {

  return (
    <Outlet />
  );
}

function App() {
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default App;
