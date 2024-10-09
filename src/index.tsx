import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin';
import LoginAdmin from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthProvider  from 'react-auth-kit';
import reportWebVitals from './reportWebVitals';
import createStore from 'react-auth-kit/createStore';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Navigate,RouterProvider , createBrowserRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
interface PrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  let token = useAuthHeader();
  let isConnected: boolean = true;
  if (!auth) {
    isConnected = false;
  }else{
    if(token != null){
      const user = JSON.parse(atob(token.split('.')[1]))
      if(token && user.role["role"]!="admin"){
        isConnected = false;
      }
    }
  }
  return isConnected ? <>{children}</> : <Navigate to="/login" />;
};
const Login: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();
  let isConnected: boolean = true;
  if (!auth) {
    isConnected = false;
  }
  return isConnected ? <Navigate to="/dashboard" /> : <>{children}</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[{
        path: "login",
        element: <Login><LoginAdmin /></Login>
      },
      {
        element: <Admin />,
        children: [{
          path: "dashboard",
          element: <PrivateRoute><Dashboard /></PrivateRoute>
        }]
      }
    ]
  },
]);
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
