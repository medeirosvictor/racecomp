import { useCallback, useState } from "react"
const initialState = {
    title:"",
    startDate:"",
    game:"",
    selectedPlatforms:[],
    pilots:[],
  }

const useLeagueCreationForm =()=>{
      
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

        const handleSetLeagueGame = useCallback( gameName => {
          setLeagueData(prev =>({
            ...prev,
            game:gameName,
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
            handleSetLeagueGame,
            handleSetSelectedPlatforms
        }
}

export default useLeagueCreationForm