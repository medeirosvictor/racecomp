import { translation } from '../constants/translation/en';
import Carousel from './Carousel';

const Section = ({ title, cardsArr }) => {
    const options = {
        races: translation.UPCOMING_RACES,
        leagues: translation.LEAGUES,
        lives: translation.LIVE,
        administredLeagues: translation.YOUR_LEAGUES,
        participantLeagues: translation.LEAGUES_YOU_PARTICIPATE
    };

    return (
        <div className="mb-5">
            <h2 className="text-2xl underline my-4">{options[title]}</h2>
            <Carousel cards={cardsArr} />
        </div>
    );
};

export default Section;
