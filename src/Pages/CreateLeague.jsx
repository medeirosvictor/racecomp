import { useNavigate } from 'react-router-dom';
import { getOwnedLeagues, handleAddLeagueToFirestore } from '../firebase';
import Form from '../Components/Form';
import FormField from '../Components/FormField';
import { translation } from '../constants/translation/en';
import useLeagueCreationForm from '../hooks/useLeagueCreationForm';
import { platformLabels } from '../constants/platformConstants';
import { createLeagueGameId, createLeagueTitleId } from '../constants/createLeagueConstants';

const CreateLeague = () => {
    const { leagueData, isSaveButtonDisabled, handleSetTitleValue, handleSetSelectedPlatforms, handleSetLeagueGame } = useLeagueCreationForm();
    const navigate = useNavigate();

   

    return (
        <div className="flex justify-center content-center items-center px-10  w-screen h-screen">
            <Form
                isSaveDisabled={isSaveButtonDisabled}
                handleSubmit={() =>  handleAddLeagueToFirestore(leagueData) }
                handleCancel={() =>navigate("/")}
                styles={"backdrop-blur-md backdrop-grayscale-1 bg-white/30 p-2 shadow-2xl rounded-lg"} title={"League Creation Form"}
            >
                <FormField
                    label={translation.LEAGUE_FORM_FIELD_TITLE}
                    placeholder={translation.LEAGUE_FORM_PLACEHOLDER}
                    value={leagueData.title}
                    onChange={handleSetTitleValue}
                    key={createLeagueTitleId}
                />
                <h3 className="font-bold  text-xl block text-gray-700">
                    {translation.PLATFORM}:
                </h3>
                {platformLabels.map(platform => (
                    <label key={platform.id} className="label  m-2 cursor-pointer">
                        <span className="label-text">{platform.label}</span>
                        <input
                            type="checkbox"
                            value={platform.id}
                            checked={leagueData.selectedPlatforms.includes(platform.id)}
                            onChange={e => handleSetSelectedPlatforms(e.target.value)}
                            className="checkbox"
                        />
                    </label>
                ))}
                <FormField
                    label={translation.GAME_NAME}
                    placeholder={translation.LEAGUE_FORM_PLACEHOLDER}
                    value={leagueData.game}
                    onChange={handleSetLeagueGame}
                    key={createLeagueGameId}
                />

            </Form>
        </div>
    )
}

export default CreateLeague