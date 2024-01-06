import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import './index.css';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import TestA from './pages/TestA.jsx';
import TestB from './pages/TestB.jsx';
import TestC from './pages/TestC.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LogIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/testa',
        element: <TestA />,
    },
    {
        path: '/testb',
        element: <TestB />,
    },
    {
        path: '/testc',
        element: <TestC />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
)
