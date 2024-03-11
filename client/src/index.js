import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorPage } from './Pages/ErrorPage/ErrorPage';
import { Home } from './Pages/Home/Home';
import { About } from './Pages/About/About';
import store from "./Store";
import { Provider } from "react-redux";
import { AdminDashboardPage } from './Pages/AdminDashboardPage';
import { AdminPostPage } from './Pages/AdminPostPage';
import { AdminUserPage } from './Pages/AdminUserPage';
import { AdminLayout } from './components/AdminLayout';
import { SignupPage } from "./Pages/SignupPage"
import { LoginPage } from './Pages/LoginPage';
import { DetailPost } from './Pages/DetailPost';
import { ForgetPasswordPage } from './Pages/ForgetPasswordPage';
import { CategoryPage } from './Pages/CategoryPage';
import { UserManagement } from './Pages/UserManagement';
import { ArticleManagement } from './Pages/ArticleManagement';
import { AdminCategory } from './Pages/AdminCategory';
import { AdminApprovePostsPage } from './Pages/AdminApprovePostsPage';
import { Profile } from './Pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:id", element: <DetailPost /> },
      { path: "about", element: <About /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgetpasswordpage", element: <ForgetPasswordPage /> },
      { path: "category", element: <CategoryPage /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "danh-muc/:slug", element: <UserManagement /> },
      { path: "article-management", element: <ArticleManagement /> },
      { path: "profile", element: <Profile /> },

    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "post", element: <AdminPostPage /> },
      { path: "approve-posts", element: <AdminApprovePostsPage /> },
      { path: "category", element: <AdminCategory /> },
      { path: "user", element: <AdminUserPage /> }
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);