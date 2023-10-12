import { useCallback, useState } from "react"
const initialState = {
    title:"",
    startDate:"",
    selectedPlatforms:[]
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
      
        const handleSetSelectedPlatforms = useCallback((platformId) => {
          setLeagueData((prev) => {
            if (prev.selectedPlatforms.includes(platformId)) {
              return {
                ...prev,
                selectedPlatforms: prev.selectedPlatforms.filter(id => id !== platformId),
              }
            } else {
              return {
                ...prev,
                selectedPlatforms:[...prev.selectedPlatforms, platformId],
              };
            }
          });
        }, []);

        return {
            leagueData,
            handleSetTitleValue,
            handleSetLeagueStart,
            handleSetSelectedPlatforms
        }
}

export default useLeaguesPage