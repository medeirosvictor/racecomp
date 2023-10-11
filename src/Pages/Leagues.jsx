import React, { useCallback, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Form from '../Components/Form';
import FormField from '../Components/FormField';
import { translation } from '../constants/translation/en';
import { users } from '../constants/mocks/usersMock';
import FormFieldSelect from '../Components/FormFieldSelect';
import FormFieldOptions from '../Components/FormFieldOptions';



const initialState = {
  title:"",
  startDate:"",
  selectedUsers:[]
}

const Leagues = () => {

  const { user } = UserAuth();
  const [leagueData,setLeagueData] = useState(initialState)


  const handleSetTitleValue = useCallback( title => {
    setLeagueData(prev =>({
      ...prev,
      title
    }))
  },[])

  const handleSetLeagueStart = useCallback( leagueStartDate => {
    setLeagueData(prev =>({
      ...prev,
      startDate:leagueStartDate,
    }))
  },[])

  const handleSetSelectedUsers = useCallback((userId) => {
    setLeagueData((prev) => {
      if (prev.selectedUsers.includes(userId)) {
        return {
          ...prev,
          selectedUsers: prev.selectedUsers.filter(id => id !== userId),
        }
      } else {
        return {
          ...prev,
          selectedUsers:[...prev.selectedUsers, userId],
        };
      }
    });
  }, []);

  if (!user) {
      return <Navigate to="/" />
  }

  return (
      <div className="flex justify-center content-center items-center  w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <Form 
          handleCancel ={()=>{ console.log("handleCancel was called")}}
          handleSubmit ={()=>{ console.log("handleSubmit was called")}}
          styles ={"backdrop-blur-md backdrop-grayscale-0 bg-white/30 p-2 shadow-md rounded"} title ={"League Creation Form"}
        >
          <FormField
            label = {translation.LEAGUE_FORM_FIELD_TITLE}
            placeholder = {translation.LEAGUE_FORM_PLACEHOLDER}
            value = {leagueData.title}
            onChange={handleSetTitleValue}
            key={translation.LEAGUE_FORM_TITLE}
          />
          <label className=" text-gray-700 text-sm font-bold mb-2 text-xl" htmlFor={"leagueStartDate"}>
            {translation.START_DATE}:
          </label>
          <input type="date" className="rounded w-32" name="leagueStartDate" id="leagueStartDateInput" onChange={e => handleSetLeagueStart( e.target.value)} />
          <FormFieldSelect placeholder = {translation.SELECT_PARTICIPANTS} optionLabel ={translation.SELECT_AN_USER} handleSelect ={handleSetSelectedUsers} values ={users}>
            <FormFieldOptions options ={users}/>
          </FormFieldSelect>
          <div className ="h-18 w-full back">
            <label  htmlFor={"selectedUsers"}  className="mt-2 text-xl  font-bold text-gray-700">
              {translation.SELECTED_USERS}
            </label>
            <ul name="selectedUsers" className=" m-auto my-4 w-48 h-24 overflow-y-auto bg-white rounded">
              {
                users?.filter(userData => leagueData.selectedUsers?.includes(userData?.uid)).map(item =>{
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