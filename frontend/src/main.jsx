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
import { Big, Random, Rectangle, ZigZag, Flat, Maze, Tutorial } from './pages/TestPages.jsx';
import { TwinPeaks } from './pages/TestPages.jsx';
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
        element: <Flat />,
    },
    {
        path: '/flat',
        element: <Flat />,
    },
    {
        path: '/random',
        element: <Random />,
    },
    {
        path: '/zigzag',
        element: <ZigZag />,
    },
    {
        path: '/maze',
        element: <Maze />,
    },
    {
        path: '/rectangle',
        element: <Rectangle />,
    },
    {
        path: '/big',
        element: <Big />,
    },
    {
        path: '/twinpeaks',
        element: <TwinPeaks />,
    },
    {
        path: '/tutorial',
        element: <Tutorial />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
)
