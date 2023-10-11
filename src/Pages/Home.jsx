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
                <h2 className='text-2xl underline my-4'>{translation.LIVE}</h2>
                <div>
                    <Card />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home