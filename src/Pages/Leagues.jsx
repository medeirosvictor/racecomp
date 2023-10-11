import React, { useCallback, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Form from '../Components/Form';
import FormField from '../Components/FormField';
import { leagueFormFields } from '../constants/leagueFormConstants';

const Leagues = () =>{

  const { user } = UserAuth();
  const [titleValue,setTitleValue] = useState('')
  const [testValue,setTestValue] = useState('')

  const handleSetTitleValue = useCallback( value => {
      setTitleValue(value)
  },[])

  const handleSetTestValue = useCallback( value => {
    setTestValue(value)
  },[])

  if (!user) {
      return <Navigate to="/" />
  }

  return (
      <div  style={{ backgroundImage: "url('src/assets/images/league-form-bg.png')" }} className="flex justify-center content-center items-center bg-center w-full h-screen">
        
        <Form styles ={"backdrop-blur-md backdrop-grayscale-0 bg-white/30 p-2 shadow-md rounded"} title ={"League Creation Form"}>
          <FormField 
            label ={leagueFormFields.TITLE_FIELD.label} 
            placeHolder ={leagueFormFields.TITLE_FIELD.placeHolder} 
            value ={titleValue}
            onChange={handleSetTitleValue}
            key={leagueFormFields.label}
          />
          <FormField
            label ={leagueFormFields.VALUE_FIELD.label} 
            placeHolder ={leagueFormFields.VALUE_FIELD.placeHolder}
            value ={testValue}
            onChange={handleSetTestValue}
            key={leagueFormFields.label}
          />
          </Form>
        </div>
    )
}

export default Leagues