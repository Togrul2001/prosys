import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import LessonList from './pages/Lesson';
import StudentList from './pages/Student';
import ExamList from './pages/Exam';
import { EducationProvider } from './contexts/EducationContext';

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
            element: <LessonList />
          },
          {
            path: "students",
            element: <StudentList />
          },
          {
            path: "exams",
            element: <ExamList />
          },
          {
            path: "/",
            element: <Navigate to="/students" />
          },
        ]
      },


    ],
  },
];

function Root() {

  return (
    <EducationProvider>
       <Outlet />
    </EducationProvider>
  );
}

function App() {
  return (
    <RouterProvider router={createBrowserRouter(routes)} />
  );
}

export default App;
