import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Root() {
  return (
    <>
    <div className='flex flex-col min-h-screen'>
      
      <Header />
      
      <main id='main' className='flex items-center justify-center flex-grow bg-slate-500'>
        <Outlet />
      </main>

      {/* <footer className='fixed bottom-0 left-0 w-screen font-bold text-center text-white bg-slate-600'>
        <p>Pie</p>
      </footer> */}

    </div>
    </>
  )
}