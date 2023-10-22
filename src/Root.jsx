import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"

enableReactTracking({
    auto: true,
});

export default function Root() {
  return (
    <>
        <div className='App flex flex-col h-screen justify-between'>
            <Header />
            <main className='p-5'>
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}
