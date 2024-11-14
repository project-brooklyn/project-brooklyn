import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { Test0, TestA, TestB, TestC, TestD, TestE } from './pages/TestPages.jsx';

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
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
