// src/App.tsx
import React,{useEffect, useState} from 'react';
import { Outlet, Link } from 'react-router-dom';

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import HeaderVisiteur from './components/headervisiteur/HeaderVisiteur';
const App: React.FC = () => {
  const token = useAuthHeader();
  const [role, setRole] = useState<string[] | null>([]);

  useEffect(() => {
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])); // Décoder le token JWT
      setRole(user.role); // Par exemple "admin" ou "visitor"
    }
  }, [token]);

  useEffect(() => {
    // if(role){
    //   if (role["role"] === 'admin') {
    //     import('./Admin.css'); 
    //   } else if (role === 'visitor') {
    //     import('./App.css'); 
    //   }
    // }
    
  }, [role]);

  return (   
    <div className='mx-auto w-56' >
      <Link to='/login'>login</Link>
      <HeaderVisiteur/>
      {/* {role["role"] === 'admin' ?" <AdminHeader />" : <HeaderVisiteur/>} */}
      
        <Outlet/>
      
    
    </div>
  );
};

export default App;
