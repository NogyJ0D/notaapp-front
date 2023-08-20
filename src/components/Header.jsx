import { NavLink, useLocation } from 'react-router-dom'
import { useUserStore } from '../store/userStore'

const Header = () => {
  const location = useLocation();
  const user = useUserStore(state => state);

  return (
    <header id='sidebar' className='flex flex-row justify-between px-12 py-2 text-white border-b-2 border-b-slate-700 bg-slate-600'>
      <NavLink to={'/'} className={'my-auto font-bold text-2xl'}>NotaApp</NavLink>

      <p className='my-auto text-xl font-bold'>
        { user.username != null ? user.username : 'User'}'s notes
      </p>
      
      <div className='flex flex-row justify-between gap-4'>
        {
          user.id
            ? <NavLink to={'/groups'} className={'bg-slate-700 p-2 rounded-md border-white border-[1px]'}>Groups</NavLink>
            : <NavLink to={'/login'} className={'bg-slate-700 p-2 rounded-md border-white border-[1px]'}>Login</NavLink>
        }
        {/* <NavLink to={'/groups'} className={'bg-slate-700 p-2 rounded-md border-white border-[1px]'}>Groups</NavLink> */}
      </div>
    </header>
  );
}

export default Header;