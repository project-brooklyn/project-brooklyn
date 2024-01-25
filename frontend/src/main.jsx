import React from 'react';
import ReactDOM from 'react-dom/client';
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
import TestD from './pages/TestD.jsx';
import TestE from './pages/TestE.jsx';
import TestF from './pages/TestF.jsx';
import TestG from './pages/TestG.jsx';


import RandomMap from './map/RandomMap.js';
const gameMap = new RandomMap();

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
        element: <TestC gameMap={gameMap}/>,
    },
    {
        path: '/testd',
        element: <TestD />,
    },
    {
        path: '/teste',
        element: <TestE />,
    },
    {
        path: '/testf',
        element: <TestF />,
    },
    {
        path: '/testg',
        element: <TestG />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    // </React.StrictMode>,
)
