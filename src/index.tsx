import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./App.css"
import Admin from './Admin';
import LoginAdmin from './pages/Login';
import Oeuvres from "./pages/OeuvresDashboard/Oeuvres";
import CreateOeuve from "./pages/OeuvresDashboard/CreateOeuvre"
import Listing from './pages/visiteurs/oeuvres/Listing';
import ListingArtists from './pages/visiteurs/artistes/ListingArtists';
import Dashboard from './pages/Dashboard';
import DetailArtist from './pages/visiteurs/artistes/DetailArtist';
import ListingExposition from './pages/visiteurs/exposition/ListingExposition';
import AuthProvider  from 'react-auth-kit';
import DetailOeuvre from "./pages/visiteurs/oeuvres/DetailOeuvre"
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
  if (!auth ) {
    isConnected = false;
  }else{
    if(token != null){
      const user = JSON.parse(atob(token.split('.')[1]))
      if(token && user.role["role"]!=="admin"){
        isConnected = false;
      }
    }
  }
  return isConnected ? <>{children}</> : <Navigate to="/login" />;
};
const Login: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  let isConnected: boolean = true;
  if (!auth) {
    isConnected = false;
  }
  return isConnected ? <Navigate to="/admin/dashboard" /> : <>{children}</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login><LoginAdmin /></Login>
      },
      {
        path: "/oeuvres/listing/:id",
        element: <Listing />
      },
      {
        path: "/oeuvres/description/:id",
        element:<DetailOeuvre/>
      },
      {
        path: "/artistes/listing",
        element:<ListingArtists/>
      },
      {
        path: "/artistes/description/:id",
        element:<DetailArtist/>
      },
      {
        path: "/expositions/:id",
        element:<ListingExposition/>
      }
      
    ]
  },
  {
    path: "/admin",

    element: <PrivateRoute><Admin /></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "oeuvres",
        element: <Oeuvres />
      },
      {
        path: "createoeuvre",
        element: <CreateOeuve />
      }
    ]
  }
]);

root.render(

    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
