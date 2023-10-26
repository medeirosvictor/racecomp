import Section from '../Components/Section';
import { leagues } from "../constants/mocks/leaguesMock";
import { translation } from '../constants/translation/en';


const Leagues = () => {
  console.log(leagues.size)
  return (
    <div >
      <div className="flex flex-col mb-72  flex-wrap items-center content text-3xl font-bold underline justify-center w-screen">
        <h1 className=" text-3xl">{translation.LEAGUE_HUB}</h1> {' '}
        {leagues.participantLeagues.length === 0 && leagues.administredLeagues.length === 0 && <h2 >{translation.NO_LEAGUES_MESSAGE}</h2>}
      </div>
      {Object.keys(leagues).map(title => {
        return (
          <Section
            key={title}
            title={title}
            cardsArr={leagues[title]}
          />
        );
      })}
    </div>
  )
}

export default Leagues