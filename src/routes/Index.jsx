import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore.js'

const Index = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state);

  useEffect(() => {
    // TODO: redirigir si no está logueado

    if (user.id == null) {
      navigate('/login');
    }

  }, [])


  return (
    <p className='m-auto text-center text-white font-xl'>Inicio</p>
  );
}

export default Index;