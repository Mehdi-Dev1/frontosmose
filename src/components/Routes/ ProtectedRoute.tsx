import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  allowedRoles,
  userRole,
  redirectPath = "/login",
}) => {
  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
    return <Navigate to={redirectPath} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Si l'utilisateur n'a pas le rôle requis, on le redirige vers une page 403 ou accueil
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;