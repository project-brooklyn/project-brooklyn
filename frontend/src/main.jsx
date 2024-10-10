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
import { TestA, TestB, TestC, TestD } from './pages/TestPages.jsx';

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
    {
        path: '/testd',
        element: <TestD />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
)
