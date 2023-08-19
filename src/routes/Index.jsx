import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: redirigir si no está logueado
    navigate('/login');
  }, [])


  return (
    <p className='m-auto text-center text-white font-xl'>Inicio</p>
  );
}

export default Index;