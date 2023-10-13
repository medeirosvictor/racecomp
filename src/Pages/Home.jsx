import Section from '../Components/Section';
import { cardsObj } from '../constants/mocks/cardMock';
import { translation } from '../constants/translation/en';
import { UserAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = UserAuth();

    return (
        <div>
            <div className="flex text-3xl font-bold underline justify-center">
                <span className="mr-1">
                    {user ? `${user?.displayName}, ` : ''}{' '}
                    {translation.WELCOME_TO}
                </span>
                <h1 className="text-3xl">{translation.RACECOMP}</h1>
                <span>!</span>
            </div>
            <div className="flex flex-col my-3">
                {Object.keys(cardsObj).map(title => {
                    return (
                        <Section
                            key={title}
                            title={title}
                            cardsArr={cardsObj[title]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
