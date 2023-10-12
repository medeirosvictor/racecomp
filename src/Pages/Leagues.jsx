import React from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Form from '../Components/Form';
import FormField from '../Components/FormField';
import { translation } from '../constants/translation/en';
import { users } from '../constants/mocks/usersMock';
import useLeaguesPage from '../hooks/useLeaguesPage';
import { platformLabels } from '../constants/platformConstants';

const Leagues = () => {
  const { user } = UserAuth();
  const { leagueData, handleSetTitleValue, handleSetSelectedPlatforms } = useLeaguesPage();


  if (!user) {
    return <Navigate to="/" />
  }


  return (
    <div className="flex justify-center content-center items-center  w-screen h-screen">
      <Form
        handleCancel={() => { console.log("handleCancel was called") }}
        handleSubmit={() => { console.log("handleSubmit was called") }}
        styles={"backdrop-blur-md backdrop-grayscale-1 bg-white/30 p-2 shadow-2xl rounded-lg"} title={"League Creation Form"}
      >
        <FormField
          label={translation.LEAGUE_FORM_FIELD_TITLE}
          placeholder={translation.LEAGUE_FORM_PLACEHOLDER}
          value={leagueData.title}
          onChange={handleSetTitleValue}
          key={translation.LEAGUE_FORM_TITLE}
        />
        <h3 className="text-gray-700 text-sm font-bold mb-2 text-xl">
          {translation.PLATFORM}:
        </h3>
        {platformLabels.map(platform => (
          <label key={platform.id} className="label cursor-pointer">
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
        {/* <input type="date" className="rounded w-32" name="leagueStartDate" id="leagueStartDateInput" onChange={e => handleSetLeagueStart(e.target.value)} /> */}
        <div className="h-18 w-full back">
          <label htmlFor={"selectedUsers"} className="mt-2 text-xl  font-bold text-gray-700">
            {translation.SELECTED_USERS}
          </label>
          <ul name="selectedUsers" className=" m-auto my-4 w-48 h-24 overflow-y-auto bg-white rounded">
            {
              users?.filter(userData => leagueData.selectedUsers?.includes(userData?.uid)).map(item => {
                return (<li key={item.uid}>{item?.displayName}</li>)
              })
            }
          </ul>
        </div>
      </Form>
    </div>
  )
}

export default Leagues