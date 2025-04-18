import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import HomePage from './pages/HomePage.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { Test0, TestA, TestB, TestC, TestD, TestE } from './pages/TestPages.jsx';
import { TwinPeaks } from './pages/TestPages.jsx';
import { AuthProvider } from './AuthProvider.jsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.js';

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
        path: '/test0',
        element: <Test0 />,
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
    {
        path: '/testd',
        element: <TestD />,
    },
    {
        path: '/teste',
        element: <TestE />,
    },
    {
        path: '/twinpeaks',
        element: <TwinPeaks />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </ThemeProvider>
)
