import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Error!</h1>
      <Link to={'/'} className='bg-green-300'>Ir a inicio</Link>
      <p>
        <i>{ error.statusText || error.message }</i>
      </p>
    </div>
  );
}