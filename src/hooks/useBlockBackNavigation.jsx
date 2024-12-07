import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBlockBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      const isAuthenticated = !!localStorage.getItem('token'); 
      if (isAuthenticated && event.state && event.state.navigationTriggered) {
        navigate('/contacts');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export { useBlockBackNavigation };
