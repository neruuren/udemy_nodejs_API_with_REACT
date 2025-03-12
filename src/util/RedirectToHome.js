// utils/RedirectToHome.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null; // Ne retourne rien car il agit seulement pour rediriger
};

export default RedirectToHome;