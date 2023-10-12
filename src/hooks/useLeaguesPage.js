import { useCallback, useState } from "react"
const initialState = {
    title:"",
    startDate:"",
    selectedUsers:[]
  }

const useLeaguesPage =()=>{
      
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

        return {

            leagueData,
            handleSetTitleValue,
            handleSetLeagueStart,
            handleSetSelectedUsers
        }
}

export default useLeaguesPage