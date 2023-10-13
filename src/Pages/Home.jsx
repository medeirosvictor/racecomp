import { UserAuth } from '../context/AuthContext';
import Card from '../Components/Card';
import { translation } from '../constants/translation/en';

function Home() {
  const { user } = UserAuth();

  return (
    <div>
        <div className='flex text-3xl font-bold underline justify-center'>
            <span className='mr-1'>
              {user ? `${user?.displayName}, `: "" } {translation.WELCOME_TO} 
            </span>
            <h1 className='text-3xl'>
            {translation.RACECOMP} 
            </h1>
            <span>!</span>
        </div>
        <div className='flex flex-col my-3'>
            <div>
                <h2 className='text-2xl underline my-4'> {translation.UPCOMING_RACES}</h2>
                <div>
                    <Card />
                </div>
            </div>
            <div>
                <h2 className='text-2xl underline my-4'>{translation.LEAGUES}</h2>
                <div>
                    <Card />
                </div>
            </div>
            <div>
                <div className='flex space-x-2 items-center'>
                    <h2 className='text-2xl underline my-4 '>
                        {translation.LIVE} 
                    </h2>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-700 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-700"></span>
                    </span>
                </div>
                <div>
                    <Card />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home