// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remplace l'URL par celle de ton endpoint d'authentification
    const response = await fetch('http://localhost:8889/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Enregistrer le token JWT dans localStorage ou context
      signIn({
        auth: {
            token: data.token ,
            type: 'Bearer'
        },
        userState: {
              name: data.name,
              uid: data.id,
              role: data.role
          }
      })
      navigate('/admin/dashboard');
    } else {
      alert('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Connexion</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
